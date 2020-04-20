import React from 'react'
import ReactDOM from 'react-dom'

import App from '../components/App'
import ClientRoot from '../components/ClientRoot'

const reactRoot = (
	<ClientRoot>
		<App />
	</ClientRoot>
)

const rootElement = (
	document
	.getElementById(
		window
		.config
		.get('reactRenderTargetId')
	)
)

ReactDOM.hydrate(
	reactRoot,
	rootElement,
)
