const {
	catchError,
	tap,
} = require('rxjs/operators')

const createEslintObservable = require('./utils/createEslintObservable')

const lintScripts$ = (
	createEslintObservable([
		'./config/**/*.js',
		'./scripts/**/*.js',
	])
	.pipe(
		tap(console.info),
		catchError((
			error,
		) => {
			console.error(
				error
			)

			process.exit()
		}),
	)
)

module.exports = lintScripts$
