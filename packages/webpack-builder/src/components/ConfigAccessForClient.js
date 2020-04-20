import PropTypes from 'prop-types'
import React from 'react'

const propTypes = {
	windowConfig: PropTypes.string,
}

const ConfigAccessForClient = ({
	windowConfig,
}) => (
	<script
		dangerouslySetInnerHTML={{
			__html: `
class Config {
	constructor(config) {
		this.config = config
	}

	get(configKey) {
		return this.config[configKey]
	}

	has(configKey) {
		return this.get(configKey) !== undefined
	}

	toJSON() {
		return this.config
	}
}

window.config = new Config(${windowConfig})
		`,
		}}
	/>
)

ConfigAccessForClient.propTypes = propTypes

export default ConfigAccessForClient
