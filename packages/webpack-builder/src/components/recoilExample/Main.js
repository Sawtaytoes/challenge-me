import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

import loadingStateMachine from './loadingStateMachine'
import typingSpeedState from './typingSpeedState'

const Main = () => {
	const [
		loadingState,
		setLoadingState,
	] = useRecoilState(loadingStateMachine)

	const [
		keyPress,
		setKeyPress,
	] = useState('')

	const setTypingSpeed = (
		useSetRecoilState(
			typingSpeedState
		)
	)

	const numberOfTypedLettersRef = useRef(0)
	const startingTimeRef = useRef()

	useEffect(
		() => {
			setLoadingState(
				loadingStateMachine
				.states
				.LOADING
			)

			const timeoutId = (
				setTimeout(
					() => {
						setLoadingState(
							loadingStateMachine
							.states
							.LOADED
						)
					},
					1000,
				)
			)

			return () => {
				clearTimeout(timeoutId)
			}
		},
		[setLoadingState],
	)

	useEffect(
		() => {
			if (
				!(
					/^[\s\w'";,.\-=\\/?!~`]{1}$/
					.test(keyPress)
				)
			) {
				return
			}

			if (!startingTimeRef.current) {
				// eslint-disable-next-line compat/compat
				startingTimeRef.current = performance.now()
			}

			numberOfTypedLettersRef.current += 1

			setTypingSpeed(
				(
					numberOfTypedLettersRef.current / (performance.now() - startingTimeRef.current) / (1000 * 60)
				)
				.toFixed(2)
			)
		},
		[
			keyPress,
			setTypingSpeed,
		]
	)

	const recordPressedKey = (
		useCallback(
			(
				event,
			) => {
				setKeyPress(event.key)
			},
			[setKeyPress]
		)
	)

	return (
		<div>
			{
				Object.is(
					loadingState,
					(
						loadingStateMachine
						.states
						.LOADING
					),
				)
				? 'Loading...'
				: <input onKeyDown={recordPressedKey} />
			}
		</div>
	)
}

export default Main
