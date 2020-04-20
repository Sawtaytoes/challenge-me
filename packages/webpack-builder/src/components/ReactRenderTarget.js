import PropTypes from 'prop-types'
import React from 'react'

const propTypes = {
	children: PropTypes.node.isRequired,
	renderTargetId: PropTypes.string.isRequired,
}

const ReactRenderTarget = ({
	children,
	renderTargetId,
}) => (
	<div
		dangerouslySetInnerHTML={{
			__html: children,
		}}
		id={renderTargetId}
	/>
)

ReactRenderTarget.propTypes = propTypes

export default ReactRenderTarget
