const {
	concatMap,
	groupBy,
	map,
	mergeAll,
	mergeMap,
	tap,
	toArray,
} = require('rxjs/operators')
const { range } = require('rxjs')

const createWantsToEatObservable = require('./createWantsToEatObservable')
const {
	forks,
	operations,
} = require('./ids')
const { stateSubscription } = require('./diningState')

const logger = (
	forkId,
	operationId,
) => (
	philosopherIndex,
) => (
	console.info([
		philosopherIndex,
		forkId,
		operationId,
	])
)

const numberOfPhilosophers = 5

const createDiningPhilosopherThreads = (
	numberOfHungerAttacks,
) => (
	range(
		0,
		numberOfPhilosophers,
	)
	.pipe(
		map((
			index,
		) => ({
			eat: (
				logger(
					forks.both,
					operations.eat,
				)
			),
			philosopherIndex: index,
			pickLeftFork: (
				logger(
					forks.left,
					operations.pick,
				)
			),
			pickRightFork: (
				logger(
					forks.right,
					operations.pick,
				)
			),
			putLeftFork: (
				logger(
					forks.left,
					operations.put,
				)
			),
			putRightFork: (
				logger(
					forks.right,
					operations.put,
				)
			),
		})),
		groupBy(({
			philosopherIndex,
		}) => (
			philosopherIndex
		)),
		mergeAll(),
		mergeMap((
			props
		) => (
			range(
				0,
				numberOfHungerAttacks,
			)
			.pipe(
				concatMap(() => (
					createWantsToEatObservable(
						props
					)
				)),
				tap((philosopherIndex) => {
					console.info(
						'eaten',
						philosopherIndex,
					)
				}),
				toArray(),
				map((
					fulfilledHungerAttacks,
				) => ({
					numberOfMealsEaten: fulfilledHungerAttacks.length,
					philosopherIndex: props.philosopherIndex,
				})),
			)
		)),
		toArray(),
		tap((
			philosophers,
		) => {
			console.info(
				'philosophers that ate',
				philosophers,
			)
		}),
		tap(() => {
			stateSubscription
			.unsubscribe()
		}),
	)
)

module.exports = createDiningPhilosopherThreads
