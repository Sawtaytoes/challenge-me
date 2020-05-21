// https://leetcode.com/problems/can-i-win/
import PropTypes from 'prop-types'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import styled from '@emotion/styled'

const StyledButton = styled.button`
	border-radius: 10px;
	cursor: pointer;
	font-family: sans-serif;
	margin-bottom: 20px;
	margin-top: 20px;
	outline: 0;
	padding: 20px;
`

const StyledContainer = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	font-size: 32px;
	margin-top: 20px;
	margin-bottom: 20px;
	width: 100vw;
`

const StyledRow = styled.div`
	column-gap: 20px;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	font-size: 20px;
	margin-top: 20px;
	margin-bottom: 20px;
`

const propTypes = {
	desiredTotal: PropTypes.number.isRequired,
	maxChoosableInteger: PropTypes.number.isRequired,
}

const playerNumbers = [
	'1',
	'2',
]

const CanIWin = ({
	desiredTotal,
	maxChoosableInteger,
}) => {
	const initialAvailableIntegers = (
		useMemo(
			() => (
				Array(maxChoosableInteger)
				.fill()
				.map((
					value,
					index,
				) => (
					index + 1
				))
			),
			[maxChoosableInteger],
		)
	)

	const [
		availableIntegers,
		setAvailableIntegers,
	] = useState(initialAvailableIntegers)

	const [
		playedIntegers,
		setPlayedIntegers,
	] = useState([])

	const [
		currentPlayerIndex,
		setCurrentPlayerIndex,
	] = useState(0)

	const [
		currentPlayerNumber,
		setCurrentPlayerNumber,
	] = useState('1')

	const [
		lastPlayedInteger,
		setLastPlayedInteger,
	] = useState(null)

	const [
		currentTotal,
		setCurrentTotal,
	] = useState(0)

	useEffect(
		() => {
			setCurrentPlayerIndex(0)
			setCurrentTotal(0)
			setLastPlayedInteger(null)

			setAvailableIntegers(
				initialAvailableIntegers
			)

			setPlayedIntegers([])
		},
		[
			initialAvailableIntegers,
			setAvailableIntegers,
			setCurrentPlayerIndex,
			setCurrentTotal,
			setLastPlayedInteger,
			setPlayedIntegers,
		]
	)

	const updateAvailableIntegers = (
		useCallback(
			(
				playedInteger,
			) => {
				const index = (
					availableIntegers
					.indexOf(playedInteger)
				)

				setAvailableIntegers(
					availableIntegers
					.slice(0, index)
					.concat(
						availableIntegers
						.slice(index + 1)
					)
				)
			},
			[
				availableIntegers,
				setAvailableIntegers,
			]
		)
	)

	const updatePlayedIntegers = (
		useCallback(
			(
				playedInteger,
			) => {
				setPlayedIntegers(
					playedIntegers
					.concat(playedInteger)
				)
			},
			[
				playedIntegers,
				setPlayedIntegers,
			],
		)
	)

	const updateCurrentTotal = (
		useCallback(
			(
				playedInteger,
			) => {
				setCurrentTotal(
					currentTotal
					+ playedInteger
				)
			},
			[
				currentTotal,
				setCurrentTotal,
			]
		)
	)

	const playNextNumber = (
		useCallback(
			() => {
				const winningInteger = (
					availableIntegers
					.reduce(
						(
							winningInteger,
							integer,
						) => (
							currentTotal + integer >= desiredTotal
							? integer
							: winningInteger
						),
						null,
					)
				)

				const lowestAvailableInteger = (
					availableIntegers
					.reduce((
						lowestAvailableInteger,
						integer,
					) => (
						Math.min(
							integer,
							lowestAvailableInteger,
						)
					))
				)

				const chosenInteger = (
					winningInteger
					|| lowestAvailableInteger
				)

				!winningInteger
				&& (
					setCurrentPlayerIndex(
						(currentPlayerIndex + 1) % 2
					)
				)

				setLastPlayedInteger(
					chosenInteger
				)

				updateAvailableIntegers(
					chosenInteger
				)

				updatePlayedIntegers(
					chosenInteger
				)

				updateCurrentTotal(
					chosenInteger
				)
			},
			[
				availableIntegers,
				currentPlayerIndex,
				currentTotal,
				desiredTotal,
				setCurrentPlayerIndex,
				setLastPlayedInteger,
				updateAvailableIntegers,
				updateCurrentTotal,
				updatePlayedIntegers,
			],
		)
	)

	useEffect(
		() => {
			setCurrentPlayerNumber(
				playerNumbers
				[currentPlayerIndex]
			)
		},
		[
			currentPlayerIndex,
			setCurrentPlayerNumber,
		]
	)

	const hasWinner = (
		currentTotal >= desiredTotal
	)

	return (
		<StyledContainer>
			<div>
				{
					hasWinner
					? `Player ${currentPlayerNumber} WON!`
					: `Current Player: ${currentPlayerNumber}`
				}
			</div>

			<div>
				Last-Played Integer: {
					lastPlayedInteger
					|| 'N/A'
				}
			</div>

			<StyledButton
				disabled={hasWinner}
				onClick={playNextNumber}
			>
				Play Next Number
			</StyledButton>

			<div>
				Amount Remaining: {
					Math.max(
						0,
						desiredTotal - currentTotal,
					)
				}
			</div>

			<StyledRow>
				<div>
					<h2>Available</h2>

					<pre>
						{
							JSON.stringify(
								availableIntegers,
								null,
								2,
							)
						}
					</pre>
				</div>

				<div>
					<h2>Played</h2>

					<pre>
						{
							JSON.stringify(
								playedIntegers,
								null,
								2,
							)
						}
					</pre>
				</div>
			</StyledRow>
		</StyledContainer>
	)
}

CanIWin.propTypes = propTypes

export default memo(CanIWin)
