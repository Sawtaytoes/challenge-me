const {
	fromEvent,
	merge,
} = require('rxjs')
const { takeUntil } = require('rxjs/operators')

const eventEmitter = require('./eventEmitter')
const printInOrder$ = require('./printInOrder$')
const stdInReader$ = require('./stdInReader$')

module.exports = (
	merge(
		printInOrder$,
		stdInReader$,
	)
	.pipe(
		takeUntil(
			fromEvent(
				eventEmitter,
				'done',
			)
		),
	)
)
