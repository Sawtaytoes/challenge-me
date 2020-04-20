import PropTypes from 'prop-types'
import React from 'react'
import { StaticRouter } from 'react-router-dom'

import ConfigContext from './ConfigContext'

const propTypes = {
	children: PropTypes.node.isRequired,
	config: PropTypes.object.isRequired,
	context: PropTypes.object.isRequired,
	location: PropTypes.string.isRequired,
}

const ServerRoot = ({
	children,
	config,
	context,
	location,
}) => (
	<ConfigContext.Provider value={config}>
		<StaticRouter
			context={context}
			location={location}
		>
			{children}
		</StaticRouter>
	</ConfigContext.Provider>
)

ServerRoot.propTypes = propTypes

export default ServerRoot
