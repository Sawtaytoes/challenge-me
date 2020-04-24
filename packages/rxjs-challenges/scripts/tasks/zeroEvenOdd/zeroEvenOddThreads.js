const { interval } = require('rxjs')

const threadA$ = (
	interval(2)
)

const threadB$ = (
	interval(4)
)

const threadC$ = (
	interval(1)
)

module.exports = {
	threadA$,
	threadB$,
	threadC$,
}
