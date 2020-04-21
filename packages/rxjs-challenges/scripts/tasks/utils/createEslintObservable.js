const { CLIEngine } = require('eslint')
const { Observable } = require('rxjs')

const createEslintObservable = (
	fileGlobs,
) => (
	Observable
	.create((
		observer,
	) => {
		const cli = (
			new CLIEngine({
				cache: true,
				fix: true,
			})
		)

		const report = (
			cli
			.executeOnFiles(
				fileGlobs
			)
		)

		CLIEngine
		.outputFixes(report)

		const {
			errorCount,
			results,
		} = report

		const formatter = (
			cli
			.getFormatter()
		)

		observer.next(
			formatter(
				results
			)
		)

		errorCount > 0
		? (
			observer.error({
				error: "One or more ESLint errors occurred.",
				errorCount,
			})
		)
		: observer.complete()
	})
)

module.exports = createEslintObservable
