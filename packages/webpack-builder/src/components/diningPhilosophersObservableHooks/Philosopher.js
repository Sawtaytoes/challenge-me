import PropTypes from 'prop-types'
import React, { memo, useMemo } from 'react'
// import styled from '@emotion/styled'
// import {css} from '@emotion/core'
import { concatMap, filter, map, scan, tap } from 'rxjs/operators'
import { EMPTY, merge, of, Subject, timer } from 'rxjs'
import { useObservable, useObservableState, useSubscription } from 'observable-hooks'

const randomTimer = (
	randomTimeInMilliseconds = Math.random() * 10000
) => (
	timer(
		Math.ceil(
			randomTimeInMilliseconds
		)
	)
)

const pickupForksEpic = (
	inputs$,
) => (
	inputs$
	.pipe(
		map(([
			eatMeal,
			getForksAvailability,
			isDoneEating,
			numberOfMealsEaten,
			pickupForks,
			putDownForks,
		]) => ({
			eatMeal,
			getForksAvailability,
			isDoneEating,
			numberOfMealsEaten,
			pickupForks,
			putDownForks,
		})),
		filter(({
			isDoneEating,
		}) => (
			!isDoneEating
		)),
		map((
			inputs,
		) => ({
			inputs,
			tryAgain$: new Subject(),
		})),
		concatMap(({
			inputs,
			tryAgain$,
		}) => (
			merge(
				tryAgain$,
				of({
					...inputs,
					tryAgain$,
				}),
			)
		)),
		concatMap(({
			eatMeal,
			getForksAvailability,
			pickupForks,
			putDownForks,
			tryAgain$,
		}) => (
			randomTimer()
			.pipe(
				concatMap(() => {
					if (
						getForksAvailability()
					) {
						tryAgain$
						.complete()

						pickupForks()
						eatMeal()

						return (
							randomTimer()
							.pipe(
								tap(putDownForks),
							)
						)
					}
					else {
						tryAgain$
						.next({
							eatMeal,
							getForksAvailability,
							pickupForks,
							putDownForks,
							tryAgain$,
						})

						return EMPTY
					}
				}),
			)
		)),
	)
)


const incrementEatCountReducer = (
	count = 0,
) => (
	count + 1
)

const eatFoodEpic = (
	eatFood$,
) => (
	eatFood$
	.pipe(
		scan(
			incrementEatCountReducer,
			undefined,
		),
	)
)

const propTypes = {
	getForksAvailability: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	pickupForks: PropTypes.func.isRequired,
	putDownForks: PropTypes.func.isRequired,
	totalNumberOfMealsToEat: PropTypes.number.isRequired,
}

const Philosopher = ({
	getForksAvailability,
	name,
	pickupForks,
	putDownForks,
	totalNumberOfMealsToEat,
}) => {
	const [
		numberOfMealsEaten,
		eatMeal,
	] = useObservableState(
		eatFoodEpic,
		0,
	)

	const isDoneEating = (
		useMemo(
			() => (
				Object.is(
					numberOfMealsEaten,
					totalNumberOfMealsToEat,
				)
			),
			[
				numberOfMealsEaten,
				totalNumberOfMealsToEat,
			],
		)
	)

	useSubscription(
		useObservable(
			pickupForksEpic,
			[
				eatMeal,
				getForksAvailability,
				isDoneEating,
				numberOfMealsEaten,
				pickupForks,
				putDownForks,
			],
		)
	)

	return (
		<div>
			<div>
				{name}
			</div>

			<div>
				Eaten meals: {numberOfMealsEaten} / {totalNumberOfMealsToEat}
			</div>

			<br />
		</div>
	)
}

Philosopher.propTypes = propTypes

const MemoizedPhilosopher = memo(Philosopher)

export default MemoizedPhilosopher
