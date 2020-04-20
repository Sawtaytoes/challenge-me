const { concatMap } = require('rxjs/operators')
const { from } = require('rxjs')

const tasks = {
	zeroEvenOdd: () => (
		require('./tasks/zeroEvenOdd/createZeroEvenOddObservable')(5)
	),
}

const tasksList = {
	develop: [
		tasks.zeroEvenOdd,
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
		},
	})
}

module.exports = runTasks
