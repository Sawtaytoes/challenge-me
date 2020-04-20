const fs = require('fs')
const path = require('path')

const rootPath = (
	fs
	.realpathSync(
		process.cwd()
	)
)

const getAbsolutePath = (
	relativePath,
) => (
	path
	.join(
		rootPath,
		relativePath,
	)
)

module.exports = getAbsolutePath
