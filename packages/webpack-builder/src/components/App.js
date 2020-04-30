import React, { Fragment } from 'react'
import { css, Global } from '@emotion/core'
import { hot } from 'react-hot-loader/root'

import CanIWin from './canIWin/CanIWin'

const App = () => (
	<Fragment>
		<Global
			styles={css`
				body {
					margin: 0;
				}
			`}
		/>

		<CanIWin
			desiredTotal={67}
			maxChoosableInteger={15}
		/>
	</Fragment>
)

export default hot(App)
