import React, { useCallback, useEffect, useReducer, useState } from 'react'
import styled from '@emotion/styled'

const StyledContainer = styled.div`
	align-items: center;
	display: flex;
	font-size: 80px;
	height: 100vh;
	justify-content: center;
	overflow: hidden;
	width: 100vw;
`

const valuesReducer = (
	state = {},
	{
		payload,
		type,
	},
) => (
	type === 'UPDATE_VALUES'
	? {
		...state,
		...payload,
	}
	: state
)

const finalValueReducer = (
	state = '',
	{
		payload,
		type,
	},
) => (
	type === 'UPDATE_FINAL_VALUE'
	? (
		payload
		.join(', ')
	)
	: state
)

const combineReducers = (
	reducers,
) => (
	state = {},
	action,
) => (
	Object
	.entries(reducers)
	.reduce(
		(
			combinedState,
			[
				reducerName,
				reducer,
			],
		) => {
			const nextCombinedState = {
				...combinedState,
				[reducerName]: (
					reducer(
						combinedState[reducerName],
						action,
					)
				),
			}

			const hasChanges = (
				Object
				.entries(nextCombinedState)
				.some(([
					stateSegmentName,
					stateSegment,
				]) => (
					Object.is(
						stateSegment,
						nextCombinedState[stateSegmentName],
					)
				))
			)

			return (
				hasChanges
				? nextCombinedState
				: combinedState
			)
		},
		state,
	)
)

const rootReducer = (
	combineReducers({
		finalValue: finalValueReducer,
		values: valuesReducer,
	})
)

const initialAction = {
	type: 'INITIALIZED',
}

const initialState = (
	rootReducer(undefined, {})
)

const ReduxObservable = () => {
	const [
		action,
		runMiddleware,
	] = useState(initialAction)

	const [
		state,
		runReducers,
	] = useReducer(
		rootReducer,
		initialState,
	)

	console.log({action, state})

	const dispatch = (
		useCallback(
			dispatchedAction => {
				runReducers(dispatchedAction)
				runMiddleware(dispatchedAction)

				return dispatchedAction
			},
			[
				runMiddleware,
				runReducers,
			],
		)
	)

	useEffect(
		() => {
			if (action.type !== 'INITIALIZED') {
				return
			}

			dispatch({
				payload: {
					value1: 'a',
				},
				type: 'UPDATE_VALUES',
			})
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[action],
	)

	useEffect(
		() => {
			if (
				!state
				.values
				.value1
			) {
				return
			}

			dispatch({
				payload: {
					value2: 'b',
				},
				type: 'UPDATE_VALUES',
			})
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[state.values.value1],
	)

	useEffect(
		() => {
			if (
				!state
				.values
				.value2
			) {
				return
			}

			dispatch({
				payload: {
					value3: 'c',
				},
				type: 'UPDATE_VALUES',
			})
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[state.values.value2],
	)

	useEffect(
		() => {
			const values = (
				Object.values(
					state
					.values
				)
			)

			if (
				!(
					values
					.every(Boolean)
				)
			) {
				return
			}

			dispatch({
				payload: values,
				type: 'UPDATE_FINAL_VALUE',
			})
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[state.values]
	)

	return (
		<StyledContainer>
			{
				state.finalValue
				|| 'Loading...'
			}
		</StyledContainer>
	)
}

export default ReduxObservable
