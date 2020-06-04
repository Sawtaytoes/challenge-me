import PropTypes from 'prop-types'
import React, { useMemo, useRef } from 'react'
import styled from '@emotion/styled'
import { catchError, scan } from 'rxjs/operators'
import { of } from 'rxjs'
import { useObservableState } from 'observable-hooks'

import Philosopher from './Philosopher'

const StyledContainer = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	font-size: 16px;
	margin-top: 20px;
	margin-bottom: 20px;
	width: 100vw;
`

const StyledPre = styled.pre`
	font-size: 14px;
`

const philosophers = [
	{
		leftForkId: 0,
		name: 'Aristotle',
		rightForkId: 4,
	},
	{
		leftForkId: 1,
		name: 'Descartes',
		rightForkId: 0,
	},
	{
		leftForkId: 2,
		name: 'Socrates',
		rightForkId: 1,
	},
	{
		leftForkId: 3,
		name: 'Tao',
		rightForkId: 2,
	},
	{
		leftForkId: 4,
		name: 'Voltaire',
		rightForkId: 3,
	},
]

const forkStates = {
	AVAILABLE: 'AVAILABLE',
	UNAVAILABLE: 'UNAVAILABLE',
}

const initialForkState = {
	handName: '',
	philosopherName: '',
	state: forkStates.AVAILABLE,
}

const initialForksState = {
	0: initialForkState,
	1: initialForkState,
	2: initialForkState,
	3: initialForkState,
	4: initialForkState,
}

const forksStateReducer = (
	forksState,
	{
		forkId,
		handName,
		philosopherName,
		state,
	},
) => ({
	...forksState,
	[forkId]: {
		handName,
		philosopherName,
		state,
	},
})

const fallbackStateReducer = (
	previousState,
	nextState,
) => (
	nextState
	|| previousState
)

const forksEpic = (
	forksState$,
) => (
	forksState$
	.pipe(
		scan(
			forksStateReducer,
			initialForksState,
		),
		catchError((
			error,
		) => {
			console.error(error)

			return of(null)
		}),
		scan(
			fallbackStateReducer,
			undefined,
		),
	)
)

const propTypes = {
	numberOfHungerAttacks: PropTypes.number.isRequired,
}

const DiningPhilosophers = ({
	numberOfHungerAttacks,
}) => {
	const [
		forksState,
		updateForkState,
	] = useObservableState(
		forksEpic,
		initialForksState,
	)

	const forksStateRef = useRef()

	forksStateRef.current = forksState

	const philosophersProps = (
		useMemo(
			() => (
				philosophers
				.map(({
					leftForkId,
					name,
					rightForkId,
				}) => ({
					getForksAvailability: () => (
						(
							forksStateRef
							.current[leftForkId]
							.state === forkStates.AVAILABLE
						)
						&& (
							forksStateRef
							.current[rightForkId]
							.state === forkStates.AVAILABLE
						)
					),
					name,
					pickupForks: () => {
						updateForkState({
							forkId: leftForkId,
							handName: 'left',
							philosopherName: name,
							state: forkStates.UNAVAILABLE,
						})

						updateForkState({
							forkId: rightForkId,
							handName: 'right',
							philosopherName: name,
							state: forkStates.UNAVAILABLE,
						})
					},
					putDownForks: () => {
						updateForkState({
							forkId: leftForkId,
							handName: 'left',
							philosopherName: name,
							state: forkStates.AVAILABLE,
						})

						updateForkState({
							forkId: rightForkId,
							handName: 'right',
							philosopherName: name,
							state: forkStates.AVAILABLE,
						})
					},
				}))
			),
			[
				forksStateRef,
				updateForkState,
			]
		)
	)

	return (
		<StyledContainer>
			<StyledPre>
				{
					JSON
					.stringify(
						forksState,
						null,
						2,
					)
				}
			</StyledPre>

			{
				philosophersProps
				.map(({
					getForksAvailability,
					name,
					pickupForks,
					putDownForks,
				}) => (
					<Philosopher
						getForksAvailability={getForksAvailability}
						key={name}
						name={name}
						pickupForks={pickupForks}
						putDownForks={putDownForks}
						totalNumberOfMealsToEat={numberOfHungerAttacks}
					/>
				))
			}
		</StyledContainer>
	)
}

DiningPhilosophers.propTypes = propTypes

export default DiningPhilosophers
