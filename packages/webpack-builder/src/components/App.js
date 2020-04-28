import React, { Fragment } from 'react'
import { css, Global } from '@emotion/core'
import { hot } from 'react-hot-loader/root'

import DiningPhilosophers from './diningPhilosophers/DiningPhilosophers'
// import Transduce from './Transduce'

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
			numberOfHungerAttacks={2}
		/>
		{/* <Transduce /> */}
	</Fragment>
)

export default hot(App)
