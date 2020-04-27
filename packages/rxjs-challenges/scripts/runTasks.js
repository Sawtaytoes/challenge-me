const { concatMap } = require('rxjs/operators')
const { from } = require('rxjs')

const tasks = {
	buildH2o: () => (
		// https://leetcode.com/problems/building-h2o/
		require('./tasks/buildH2o')
	),
	fieldChainedHtmlFormatting: () => (
		require('./tasks/fieldChainedHtmlFormatting')
	),
	lintScripts: () => (
		require('./tasks/lintScripts$')
	),
	printInOrder: () => (
		require('./tasks/printInOrder')
	),
	zeroEvenOdd: () => (
		require('./tasks/zeroEvenOdd')
		.createZeroEvenOddObservable(5)
	),
}

const tasksList = {
	develop: [
		tasks.lintScripts,
		tasks.fieldChainedHtmlFormatting,
	],
}

const runTasks = ({
	task: taskNames,
}) => {
	from(
		Array.isArray(
			taskNames
		)
		? taskNames
		: [taskNames]
	)
	.pipe(
		concatMap((
			taskName,
		) => (
			tasksList[taskName]
		)),
		concatMap((
			requireTask,
		) => (
			requireTask()
		)),
	)
	.subscribe({
		complete: () => {
			const dashes = (
				Array(
					process
					.stdout
					.columns
				)
				.fill('=')
				.join('')
			)

			console.info(
				"Completed running all tasks."
			)

			console.info(
				dashes
			)

			process.exit()
		},
		error: error => {
			console.error(
				error
			)

			process.exit()
		},
	})
}

module.exports = runTasks
