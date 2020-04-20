const config = require('config')
const cors = require('cors')
const express = require('express')
const { catchError, map, tap } = require('rxjs/operators')
const { of } = require('rxjs')

const createEntrypointRenderer = require('./utils/createEntrypointRenderer')

const productionHttpServer$ = (
	of(express())
	.pipe(
		tap(() => {
			createEntrypointRenderer
			.listenForEntrypoints()
		}),
		map((
			httpServer,
		) => (
			httpServer
			.use(cors())

			.use(
				express
				.static(
					config.get('outputPath'),
					{ redirect: false }
				)
			)

			.get(
				'*',
				createEntrypointRenderer({
					filename: 'server.main.bundle',
				})
			)
		)),
		tap((
			httpServer
		) => {
			httpServer
			.listen(
				(
					config
					.get('serverPort')
				),
				error => {
					error
					? console.error(error)
					: console.info('Listening for web requests...')
				}
			)
		}),
		catchError((
			error,
		) => {
			console.error(
				'Express server failed:',
				error,
			)

			process.exit()
		}),
	)
)

module.exports = productionHttpServer$
