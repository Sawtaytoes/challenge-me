const { BehaviorSubject, Subject } = require('rxjs')
const { catchError, scan } = require('rxjs/operators')

const diningStateReducer = (
	state,
	{
		philosopherIndex,
		forkId,
		forkState,
	},
) => ({
	...state,
	[philosopherIndex]: {
		...state[philosopherIndex],
		[forkId]: forkState,
	},
})

const updateDiningState$ = new Subject()

const initialState = {
	0: {},
	1: {},
	2: {},
	3: {},
	4: {},
}

const diningState$ = (
	new BehaviorSubject(
		initialState
	)
)

const stateSubscription = (
	updateDiningState$
	.pipe(
		scan(
			diningStateReducer,
			initialState,
		),
		catchError(console.error),
	)
	.subscribe(diningState$)
)

module.exports = {
	diningState$,
	stateSubscription,
	updateDiningState$,
}
