const { fromEvent } = require('rxjs')

const eventEmitter = require('./eventEmitter')

const threadA$ = (
	fromEvent(
		eventEmitter,
		'threadA',
	)
)

const threadB$ = (
	fromEvent(
		eventEmitter,
		'threadB',
	)
)

const threadC$ = (
	fromEvent(
		eventEmitter,
		'threadC',
	)
)

module.exports = {
	threadA$,
	threadB$,
	threadC$,
}
