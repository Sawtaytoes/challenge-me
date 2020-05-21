import React, { useEffect, useState } from 'react'
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

const ReactHooksTraditional = () => {
	const [value1, setValue1] = useState('')
	const [value2, setValue2] = useState('')
	const [value3, setValue3] = useState('')
	const [finalValue, setFinalValue] = useState('LOADING...')

	useEffect(
		() => {
			setValue1('a')
		},
		[],
	)

	useEffect(
		() => {
			if (!value1) {
				return
			}

			setValue2('b')
		},
		[value1],
	)

	useEffect(
		() => {
			if (!value2) {
				return
			}

			setValue3('c')
		},
		[value2],
	)

	useEffect(
		() => {
			const values = [
				value1,
				value2,
				value3,
			]

			if (
				!(
					values
					.every(Boolean)
				)
			) {
				return
			}

			setFinalValue(
				values
				.join(', ')
			)
		},
		[
			value1,
			value2,
			value3,
		]
	)

	return (
		<StyledContainer>
			{finalValue}
		</StyledContainer>
	)
}

export default ReactHooksTraditional
