import React, { useContext } from 'react'
import styled from '@emotion/styled'
import { css, Global } from '@emotion/core'
import { hot } from 'react-hot-loader/root'

import ConfigContext from './ConfigContext'

const StyledContainer = styled.div`
	align-items: center;
	display: flex;
	height: 100vh;
	justify-content: flex-start;
	overflow: hidden;
	width: 100vw;
`

const App = () => {
	const config = useContext(ConfigContext)

	return (
		<StyledContainer>
			<Global
				styles={css`
					body {
						margin: 0;
					}
				`}
			/>

			<pre>
				{
					JSON.stringify(
						config,
						null,
						2,
					)
				}
			</pre>
		</StyledContainer>
	)
}

export default hot(App)
