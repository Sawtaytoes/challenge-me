const webpack = require('webpack')
const { bindNodeCallback, of } = require('rxjs')
const { catchError, filter, switchMap, tap } = require('rxjs/operators')

const webpackServerConfig = require('./utils/webpackServerConfig')

const webpackBuildServer$ = (
	of(webpackServerConfig)
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
				'Webpack server build failed:',
				error,
			)

			process.exit()
		}),
	)
)

module.exports = webpackBuildServer$
