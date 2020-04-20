const config = require('config')
const os = require('os')
const webpack = require('webpack')
const webpackNodeExternals = require('webpack-node-externals')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const getAbsolutePath = require('../../../config/utils/getAbsolutePath')

const isLocalDevelopment = config.get('isLocalDevelopment')
const nodeEnvironment = config.get('nodeEnvironment')
const outputPath = config.get('outputPath')

const webpackServerConfig = {
	devtool: (
		isLocalDevelopment
		&& 'eval-source-map'
	),
	entry: {
		main: (
			getAbsolutePath(
				'./src/entries/server.js'
			)
		),
	},
	externals: [webpackNodeExternals()],
	mode: nodeEnvironment,
	module: {
		rules: [
			{
				exclude: /node_modules/,
				test: /\.(js|jsx)$/,
				use: {
					loader: 'babel-loader',
					options: {
						cacheDirectory: true,
					},
				},
			},
		],
	},
	output: {
		filename: (
			isLocalDevelopment
			? 'server.[name].bundle.js'
			: 'server.[chunkhash:8].js'
		),
		libraryTarget: 'commonjs2',
		path: outputPath,
	},
	parallelism: (
		os
		.cpus()
		.length
	),
	plugins: [
		new webpack.DefinePlugin({
			'global.renderEnvironment': 'server',
		}),
		new webpack.ProgressPlugin(),
		new CleanWebpackPlugin({
			// cleanStaleWebpackAssets: false,
		}),
	],
	resolve: {
		extensions: ['.js'],
	},
	stats: {
		colors: true,
		preset: 'errors-warnings',
	},
	target: 'node',
	watch: isLocalDevelopment,
	watchOptions: {
		ignored: [
			outputPath,
			'./node_modules/',
			'./scripts/',
		],
	},
}

module.exports = webpackServerConfig
