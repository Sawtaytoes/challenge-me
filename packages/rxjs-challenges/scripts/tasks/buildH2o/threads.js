const { Subject } = require('rxjs')

const hydrogenThread$ = new Subject()
const oxygenThread$ = new Subject()

const outputRef = {
	current: '',
}

const resetOutput = () => {
	outputRef.current = ''
}

const logger = (
	element
) => (
	() => {
		outputRef.current = outputRef.current + element
	}
)

const logH = logger('H')
const logO = logger('O')

setTimeout(() => {
	hydrogenThread$.next(logH)
	oxygenThread$.next(logO)
	hydrogenThread$.next(logH)

	console.info(outputRef.current)
	resetOutput()

	oxygenThread$.next(logO)
	oxygenThread$.next(logO)
	hydrogenThread$.next(logH)
	hydrogenThread$.next(logH)
	hydrogenThread$.next(logH)
	hydrogenThread$.next(logH)

	console.info(outputRef.current)
	resetOutput()
})

module.exports = {
	hydrogenThread$,
	oxygenThread$,
}
