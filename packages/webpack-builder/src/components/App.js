import React, { Fragment } from 'react'
import { css, Global } from '@emotion/core'
import { hot } from 'react-hot-loader/root'

import DiningPhilosophers from './diningPhilosophersObservableHooks/DiningPhilosophers'

const App = () => (
	<Fragment>
		<Global
			styles={css`
				body {
					margin: 0;
				}
			`}
		/>

		<DiningPhilosophers
			numberOfHungerAttacks={3}
		/>
	</Fragment>
)

export default hot(App)
