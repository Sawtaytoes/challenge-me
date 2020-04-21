const { filter, ignoreElements, map, tap } = require('rxjs/operators')
const { fromEvent } = require('rxjs')

const eventEmitter = require('./eventEmitter')

process
.stdin
.setEncoding('utf8')

const stdInReader$ = (
	fromEvent(
		process.stdin,
		'readable'
	)
	.pipe(
		map(() => (
			process
			.stdin
			.read()
		)),
		filter(Boolean),
		map((
			eventName
		) => (
			eventName
			.trim()
		)),
		tap((
			eventName,
		) => {
			eventEmitter
			.emit(eventName)
		}),
		ignoreElements(),
	)
)

module.exports = stdInReader$
