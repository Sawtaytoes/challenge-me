import PropTypes from 'prop-types'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import {css} from '@emotion/core'

import DiningPhilosophersContext from './DiningPhilosophersContext'

const StyledContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 30px;
`

const StyledPre = styled.pre`
	margin: 0;
`

const getRandomTime = () => (
	Math.ceil(
		Math.random() * 10000
	)
)

const getPrevPhilosopherIndex = (
	philosopherIndex,
) => (
	((philosopherIndex - 1) + 5) % 5
)

const getNextPhilosopherIndex = (
	philosopherIndex,
) => (
	(philosopherIndex + 1) % 5
)

const propTypes = {
	philosopherIndex: PropTypes.number.isRequired,
	totalNumberOfMealsToEat: PropTypes.number.isRequired,
}

const Philosopher = ({
	philosopherIndex,
	totalNumberOfMealsToEat,
}) => {
	const [
		iterationStep,
		setIterationStep,
	] = useState(0)

	const [
		numberOfMealsEaten,
		setNumberOfMealsEaten,
	] = useState(0)

	const store = (
		useContext(
			DiningPhilosophersContext
		)
	)

	const pickupLeftFork = (
		useCallback(
			() => {
				store
				.dispatch({
					philosopherIndex,
					forkId: 'leftFork',
					forkState: true,
				})
			},
			[
				philosopherIndex,
				store,
			],
		)
	)

	const pickupRightFork = (
		useCallback(
			() => {
				store
				.dispatch({
					philosopherIndex,
					forkId: 'rightFork',
					forkState: true,
				})
			},
			[
				philosopherIndex,
				store,
			],
		)
	)

	const putDownLeftFork = (
		useCallback(
			() => {
				store
				.dispatch({
					philosopherIndex,
					forkId: 'leftFork',
					forkState: false,
				})
			},
			[
				philosopherIndex,
				store,
			],
		)
	)

	const putDownRightFork = (
		useCallback(
			() => {
				store
				.dispatch({
					philosopherIndex,
					forkId: 'rightFork',
					forkState: false,
				})
			},
			[
				philosopherIndex,
				store,
			],
		)
	)

	const isLeftForkAvailable = (
		useCallback(
			() => (
				!store
				.getState()
				[getPrevPhilosopherIndex(philosopherIndex)]
				.rightFork
			),
			[
				philosopherIndex,
				store,
			],
		)
	)

	const isRightForkAvailable = (
		useCallback(
			() => (
				!store
				.getState()
				[getNextPhilosopherIndex(philosopherIndex)]
				.leftFork
			),
			[
				philosopherIndex,
				store,
			],
		)
	)

	const hasLeftFork = (
		useCallback(
			() => (
				store
				.getState()
				[philosopherIndex]
				.leftFork
			),
			[
				philosopherIndex,
				store,
			],
		)
	)

	const hasRightFork = (
		useCallback(
			() => (
				store
				.getState()
				[philosopherIndex]
				.rightFork
			),
			[
				philosopherIndex,
				store,
			],
		)
	)

	useEffect(
		() => {
			if (
				numberOfMealsEaten
				>= totalNumberOfMealsToEat
			) {
				if (hasLeftFork()) {
					putDownLeftFork()
				}

				if (hasRightFork()) {
					putDownRightFork()
				}

				return
			}

			const timeoutIds = {}

			timeoutIds.left = (
				setTimeout(
					() => {
						if (!isLeftForkAvailable()) {
							clearTimeout(
								timeoutIds.right
							)

							if (hasRightFork()) {
								putDownRightFork()
							}

							setIterationStep(
								iterationStep + 1
							)
						}
						else {
							pickupLeftFork()
						}
					},
					getRandomTime(),
				)
			)

			timeoutIds.right = (
				setTimeout(
					() => {
						if (!isRightForkAvailable()) {
							clearTimeout(
								timeoutIds.right
							)

							if (hasLeftFork()) {
								putDownLeftFork()
							}

							setIterationStep(
								iterationStep + 1
							)
						}
						else {
							pickupRightFork()
						}
					},
					getRandomTime(),
				)
			)

			return () => {
				Object
				.values(timeoutIds)
				.forEach((
					timeoutId
				) => {
					clearTimeout(
						timeoutId
					)
				})
			}
		},
		[
			hasLeftFork,
			hasRightFork,
			isLeftForkAvailable,
			isRightForkAvailable,
			iterationStep,
			numberOfMealsEaten,
			pickupLeftFork,
			pickupRightFork,
			putDownLeftFork,
			putDownRightFork,
			setIterationStep,
			store,
			totalNumberOfMealsToEat,
		],
	)

	useEffect(
		() => {
			if (
				!hasLeftFork()
				|| !hasRightFork()
			) {
				return
			}

			const timeoutId = (
				setTimeout(
					() => {
						putDownLeftFork()
						putDownRightFork()

						setNumberOfMealsEaten(
							numberOfMealsEaten + 1
						)
					},
					getRandomTime(),
				)
			)

			return () => {
				clearTimeout(
					timeoutId
				)
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[
			hasLeftFork(), // eslint-disable-line react-hooks/exhaustive-deps
			hasRightFork(), // eslint-disable-line react-hooks/exhaustive-deps
			numberOfMealsEaten,
			putDownLeftFork,
			putDownRightFork,
			setNumberOfMealsEaten,
		],
	)

	return (
		<StyledContainer>
			<StyledPre>
				Philosopher:
				{' '}
				<strong>
					{philosopherIndex}
				</strong>
			</StyledPre>

			<div
				css={css`
					display: flex;
				`}
			>
				<div
					css={css`
						background-color: ${
							hasLeftFork()
							? 'red'
							: 'black'
						};
						height: 30px;
						width: 30px;
					`}
				/>

				<div
					css={css`
						align-items: center;
						background-color: grey;
						display: flex;
						font-family: monospace;
						font-size: 60px;
						height: 60px;
						justify-content: center;
						width: 60px;
					`}
				>
					{numberOfMealsEaten}
				</div>

				<div
					css={css`
						background-color: ${
							hasRightFork()
							? 'red'
							: 'black'
						};
						height: 30px;
						width: 30px;
					`}
				/>
			</div>
		</StyledContainer>
	)
}

Philosopher.propTypes = propTypes

export default Philosopher
