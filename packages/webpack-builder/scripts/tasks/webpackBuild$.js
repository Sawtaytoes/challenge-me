const webpack = require('webpack')
const { bindNodeCallback, of } = require('rxjs')
const { catchError, filter, switchMap, tap } = require('rxjs/operators')

const webpackClientConfig = require('./utils/webpackClientConfig')
const webpackServerConfig = require('./utils/webpackServerConfig')

const webpackBuild$ = (
	of([
		webpackClientConfig,
		webpackServerConfig,
	])
	.pipe(
		switchMap((
			webpackConfig,
		) => (
			bindNodeCallback(
				webpack
			)(
				webpackConfig
			)
		)),
		filter(Boolean),
		tap((
			stats,
		) => {
			console.info(
				stats
				.toString({ colors: true })
			)
		}),
		catchError(error => {
			console.error(
				'Webpack build failed:',
				error,
			)

			process.exit()
		}),
	)
)

module.exports = webpackBuild$
