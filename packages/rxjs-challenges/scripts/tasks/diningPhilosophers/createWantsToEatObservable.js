const { concatMap, map, mapTo, tap } = require('rxjs/operators')
const { EMPTY, merge, of, Subject, timer, zip } = require('rxjs')

const { diningState$, updateDiningState$ } = require('./diningState')
const { forks } = require('./ids')

const getRandomTime = () => (
	Math.ceil(
		Math.random() * 10000
	)
)

const getPrevPhilosopher = (
	philosopherIndex,
) => (
	((philosopherIndex - 1) + 5) % 5
)

const getNextPhilosopher = (
	philosopherIndex,
) => (
	(philosopherIndex + 1) % 5
)

const createWantsToEatObservable = (
	props,
) => {
	const tryAgain$ = new Subject()

	const pickupLeftFork = (
		philosopherIndex
	) => {
		updateDiningState$
		.next({
			philosopherIndex,
			forkId: forks.left,
			forkState: true,
		})
	}

	const pickupRightFork = (
		philosopherIndex
	) => {
		updateDiningState$
		.next({
			philosopherIndex,
			forkId: forks.right,
			forkState: true,
		})
	}

	const putDownLeftFork = (
		philosopherIndex
	) => {
		updateDiningState$
		.next({
			philosopherIndex,
			forkId: forks.left,
			forkState: false,
		})
	}

	const putDownRightFork = (
		philosopherIndex
	) => {
		updateDiningState$
		.next({
			philosopherIndex,
			forkId: forks.right,
			forkState: false,
		})
	}

	return (
		merge(
			of(props),
			tryAgain$,
		)
		.pipe(
			concatMap(({
				eat,
				philosopherIndex,
				pickLeftFork: leftForkPickedUp,
				pickRightFork: rightForkPickedUp,
				putLeftFork: leftForkPutDown,
				putRightFork: rightForkPutDown,
			}) => (
				zip(
					timer(getRandomTime())
					.pipe(
						map(() => (
							!diningState$
							.value
							[getPrevPhilosopher(philosopherIndex)]
							[forks.right]
						)),
						tap((
							isLeftForkAvailable,
						) => {
							if (!isLeftForkAvailable) {
								return
							}

							pickupLeftFork(
								philosopherIndex
							)
							leftForkPickedUp(
								philosopherIndex
							)
						}),
					),
					timer(getRandomTime())
					.pipe(
						map(() => (
							!diningState$
							.value
							[getNextPhilosopher(philosopherIndex)]
							[forks.left]
						)),
						tap((
							isRightForkAvailable,
						) => {
							if (!isRightForkAvailable) {
								return
							}

							pickupRightFork(
								philosopherIndex
							)
							rightForkPickedUp(
								philosopherIndex
							)
						}),
					),
				)
				.pipe(
					concatMap(() => {
						const hasLeftFork = (
							diningState$
							.value
							[philosopherIndex]
							[forks.left]
						)

						const hasRightFork = (
							diningState$
							.value
							[philosopherIndex]
							[forks.right]
						)

						if (
							hasLeftFork
							&& hasRightFork
						) {
							eat(philosopherIndex)

							return (
								timer(getRandomTime())
								.pipe(
									tap(() => {
										putDownLeftFork(
											philosopherIndex
										)
										leftForkPutDown(
											philosopherIndex
										)

										putDownRightFork(
											philosopherIndex
										)
										rightForkPutDown(
											philosopherIndex
										)
									}),
									mapTo(philosopherIndex),
								)
							)
						}
						else {
							if (hasLeftFork) {
								putDownLeftFork(
									philosopherIndex
								)
								leftForkPutDown(
									philosopherIndex
								)
							}

							if (hasRightFork) {
								putDownRightFork(
									philosopherIndex
								)
								rightForkPutDown(
									philosopherIndex
								)
							}

							console.info(
								'trying again',
								philosopherIndex,
							)

							tryAgain$
							.next({
								eat,
								philosopherIndex,
								pickLeftFork: leftForkPickedUp,
								pickRightFork: rightForkPickedUp,
								putLeftFork: leftForkPutDown,
								putRightFork: rightForkPutDown,
							})

							return (
								EMPTY
							)
						}
					}),
				)
			)),
			tap(() => {
				tryAgain$
				.complete()
			}),
		)
	)
}

module.exports = createWantsToEatObservable
