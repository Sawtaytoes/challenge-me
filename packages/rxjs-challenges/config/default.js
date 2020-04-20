const getAbsolutePath = require('./utils/getAbsolutePath')

module.exports = {
	isLocalDevelopment: false,
	nodeEnvironment: 'production',
	outputPath: getAbsolutePath('./build'),
	reactRenderTargetId: 'react-root',
	serverPort: 8000,
}
