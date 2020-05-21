const { fromEvent } = require('rxjs')
const { tap } = require('rxjs/operators')

const index = process.argv[2]

fromEvent(
	process,
	'message',
)
.pipe(
	tap(() => {
		console.info(
			'ChildProcess',
			index,
			'Started',
		)
	}),
	tap(() => {
		// Halt processing for a random period of time.
		const luckyNumber = (
			Math.round(
				Math.random() * 1000000000
			)
		)

		let currentNumber = 0

		while (
			!Object.is(
				currentNumber,
				luckyNumber,
			)
		) {
			currentNumber = (
				Math.round(
					Math.random() * 1000000000
				)
			)
		}
	}),
	tap(([
		message,
	]) => (
		console.info(
			'childProcess'
			.concat(' ')
			.concat(index)
			.concat(' ')
			.concat('Message'),
			{ task: message.task },
		)
	)),
	tap(() => {
		console.info(
			'ChildProcess',
			index,
			'Ended',
		)
	}),
	tap(([
		message,
	]) => {
		process
		.send(message)
	})
)
.subscribe()
