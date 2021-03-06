const { concatMap } = require('rxjs/operators')
const { from } = require('rxjs')

const tasks = {
	buildH2o: () => (
		// https://leetcode.com/problems/building-h2o/
		require('./tasks/buildH2o')
	),
	diningPhilosophers: () => (
		// https://leetcode.com/problems/the-dining-philosophers/
		require('./tasks/diningPhilosophers')
		.createDiningPhilosopherThreads(2)
	),
	fieldChainedHtmlFormatting: () => (
		require('./tasks/fieldChainedHtmlFormatting')
	),
	lintScripts: () => (
		require('./tasks/lintScripts$')
	),
	loadBalancer: () => (
		require('./tasks/loadBalancer')
		.loadBalancer()
	),
	printInOrder: () => (
		// https://leetcode.com/problems/print-in-order/
		require('./tasks/printInOrder')
	),
	wordLadderII: () => (
		// https://leetcode.com/problems/word-ladder-ii/
		require('./tasks/wordLadderII')
		.transformPaths({
			beginWord: 'hit',
			endWord: 'cog',
			wordList: [
				'hot',
				'dot',
				'dog',
				'lot',
				'log',
				'cog',
			],
		})
	),
	zeroEvenOdd: () => (
		// https://leetcode.com/problems/print-zero-even-odd/
		require('./tasks/zeroEvenOdd')
		.createZeroEvenOddObservable(5)
	),
}

const tasksList = {
	develop: [
		tasks.lintScripts,
		// tasks.loadBalancer,
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
		: [
			taskNames,
		]
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
				'Completed running all tasks.'
			)

			console.info(
				dashes
			)

			process.exit()
		},
		error: (error) => {
			console.error(
				error
			)

			process.exit()
		},
	})
}

module.exports = runTasks
