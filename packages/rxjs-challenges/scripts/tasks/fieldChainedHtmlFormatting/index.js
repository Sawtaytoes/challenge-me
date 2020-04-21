const { merge } = require('rxjs')

const formatObjectCreate$ = require('./formatObjectCreate')
const formatProxy$ = require('./formatProxy')

module.exports = (
	merge(
		formatObjectCreate$,
		formatProxy$,
	)
)
