import React, { Fragment } from 'react'
import { css, Global } from '@emotion/core'
import { hot } from 'react-hot-loader/root'

import RecoilExampleRoot from './recoilExample/RecoilExampleRoot'

const App = () => (
	<Fragment>
		<Global
			styles={css`
				body {
					margin: 0;
				}
			`}
		/>

		<RecoilExampleRoot />
	</Fragment>
)

export default hot(App)
