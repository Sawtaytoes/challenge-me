import PropTypes from 'prop-types'
import React, { useMemo, useReducer, useRef } from 'react'
import styled from '@emotion/styled'

import DiningPhilosophersContext from './DiningPhilosophersContext'
import Philosopher from './Philosopher'

const StyledContainer = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	font-size: 32px;
	margin-top: 20px;
	margin-bottom: 20px;
	width: 100vw;
`

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

const initialState = {
	0: {},
	1: {},
	2: {},
	3: {},
	4: {},
}

const numberOfPhilosophers = 5

const philosopherIndexes = (
	Array(numberOfPhilosophers)
	.fill()
	.map((
		value,
		index,
	) => (
		index
	))
)

const propTypes = {
	numberOfHungerAttacks: PropTypes.number.isRequired,
}

const DiningPhilosophers = ({
	numberOfHungerAttacks,
}) => {
	const [state, dispatch] = (
		useReducer(
			diningStateReducer,
			initialState,
		)
	)

	const stateRef = useRef(state)

	stateRef.current = state

	const store = (
		useMemo(
			() => ({
				dispatch,
				getState: () => stateRef.current,
			}),
			[]
		)
	)

	return (
		<StyledContainer>
			<DiningPhilosophersContext.Provider
				value={store}
			>
				{
					philosopherIndexes
					.map((
						philosopherIndex,
					) => (
						<Philosopher
							key={philosopherIndex}
							philosopherIndex={
								philosopherIndex
							}
							totalNumberOfMealsToEat={
								numberOfHungerAttacks
							}
						/>
					))
				}
			</DiningPhilosophersContext.Provider>
		</StyledContainer>
	)
}

DiningPhilosophers.propTypes = propTypes

export default DiningPhilosophers
