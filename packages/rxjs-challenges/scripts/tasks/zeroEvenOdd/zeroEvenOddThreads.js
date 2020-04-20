const { interval } = require('rxjs')

const threadA$ = (
	interval(4000)
)

const threadB$ = (
	interval(3000)
)

const threadC$ = (
	interval(2000)
)

module.exports = {
	threadA$,
	threadB$,
	threadC$,
}
