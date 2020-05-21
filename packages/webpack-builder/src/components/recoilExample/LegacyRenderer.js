import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useRecoilState } from 'recoil'

import legacyLoadingState from './legacyLoadingState'

const StyledContainer = styled.div`
	align-items: center;
	display: flex;
	font-size: 80px;
	height: 100vh;
	justify-content: center;
	overflow: hidden;
	width: 100vw;
`

const LegacyRenderer = () => {
	const [isLoading, setIsLoading] = useState(true)
	// const [isLoading, setIsLoading] = useRecoilState(legacyLoadingState)

	useEffect(
		() => {
			setIsLoading(true)

			const timeoutId = (
				setTimeout(
					() => {
						setIsLoading(false)
					},
					1000,
				)
			)

			return () => {
				clearTimeout(timeoutId)
			}
		},
		[setIsLoading],
	)

	return (
		<StyledContainer>
			{
				isLoading
				? 'Loading...'
				: 'READY!'
			}
		</StyledContainer>
	)
}

export default LegacyRenderer
