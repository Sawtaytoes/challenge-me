import PropTypes from 'prop-types'
import React from 'react'

const propTypes = {
	children: PropTypes.node.isRequired,
	htmlComponents: (
		PropTypes.shape({
			body: PropTypes.node,
			head: PropTypes.node,
			htmlProps: PropTypes.object,
			scripts: PropTypes.node,
		})
	),
}

const Html = ({
	children,
	htmlComponents = {},
}) => (
	<html
		{...htmlComponents.htmlProps}
		lang="en"
	>
		<head>
			<title>Webpack Builder</title>

			{htmlComponents.head}
		</head>
		<body>
			{children}

			{htmlComponents.body}
			{htmlComponents.scripts}
		</body>
	</html>
)

Html.propTypes = propTypes

export default Html
