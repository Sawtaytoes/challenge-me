const config = require('config')

process
.env
.NODE_ENV = (
	config
	.get('nodeEnvironment')
)

const yargs = require('yargs')

const runTasks = require('./scripts/runTasks')

runTasks(
	yargs.argv
)
