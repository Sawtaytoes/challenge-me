const config = require('config')
const path = require('path')
const { catchError, map, mergeMap, tap } = require('rxjs/operators')
const { EMPTY, of, Subject } = require('rxjs')

const renderEntrypoint$ = new Subject()

const listenForEntrypoints = () => {
	const __CONFIG__ = (
		JSON.stringify(
			config
		)
	)

	renderEntrypoint$
	.pipe(
		tap(({
			filePath,
		}) => {
			config.get('isLocalDevelopment')
			&& (
				delete (
					require.cache[
						require.resolve(
							filePath
						)
					]
				)
			)
		}),
		mergeMap(({
			filePath,
			options = {},
			request,
			response,
		}) => (
			of(null)
			.pipe(
				map(() => (
					require(filePath)
					.default
				)),
				map((
					serverEntrypoint,
				) => (
					serverEntrypoint({
						__CONFIG__,
						config,
						options,
						request,
						response,
					})
				)),
				catchError((
					error,
				) => {
					response.send(error)
					console.error(error)

					return EMPTY
				}),
			)
		)),
	)
	.subscribe()
}

const createEntrypointRenderer = ({
	filename,
	options,
}) => {
	const filePath = (
		path.join(
			config.get('outputPath'),
			filename,
		)
	)

	return (
		request,
		response,
	) => {
		renderEntrypoint$
		.next({
			filePath,
			options,
			request,
			response,
		})
	}
}

createEntrypointRenderer
.listenForEntrypoints = listenForEntrypoints

module.exports = createEntrypointRenderer
