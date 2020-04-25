import React, { Fragment } from 'react'
import { css, Global } from '@emotion/core'
import { hot } from 'react-hot-loader/root'

import CustomElementRenderer from '../sawtaytoesFrameworkComponents/CustomElementRenderer'
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

		<CustomElementRenderer />
		{/* <Transduce /> */}
	</Fragment>
)

export default hot(App)
