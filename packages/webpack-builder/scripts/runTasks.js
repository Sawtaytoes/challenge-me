const { concatMap } = require('rxjs/operators')
const { from } = require('rxjs')

const tasks = {
	developmentHttpServer: () => (
		require('./tasks/developmentHttpServer$')
	),
	lintScripts: () => (
		require('./tasks/lintScripts$')
	),
	productionHttpServer: () => (
		require('./tasks/productionHttpServer$')
	),
	webpackBuild: () => (
		require('./tasks/webpackBuild$')
	),
	webpackBuildServer: () => (
		require('./tasks/webpackBuildServer$')
	),
}

const tasksList = {
	build: [
		tasks.lintScripts,
		tasks.webpackBuild,
	],
	develop: [
		tasks.lintScripts,
		tasks.webpackBuildServer,
		tasks.developmentHttpServer,
	],
	lint: [
		tasks.lintScripts,
	],
	serve: [
		tasks.productionHttpServer,
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
