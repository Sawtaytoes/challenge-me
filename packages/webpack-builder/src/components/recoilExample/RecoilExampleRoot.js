import React from 'react'
import { RecoilRoot } from 'recoil'
import styled from '@emotion/styled'

import Footer from './Footer'
import Header from './Header'
import Main from './Main'

const StyledContainer = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	font-family: monospace;
	font-size: 40px;
	height: 100vh;
	justify-content: space-between;
	overflow: hidden;
	width: 100vw;
`

const RecoilExampleRoot = () => (
	<RecoilRoot>
		<StyledContainer>
			<Header />
			<Main />
			<Footer />
		</StyledContainer>
	</RecoilRoot>
)

export default RecoilExampleRoot
