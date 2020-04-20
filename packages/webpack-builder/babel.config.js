const config = require('config')

const isLocalDevelopment = (
	config
	.get('isLocalDevelopment')
)

const plugins = [
	'@babel/plugin-proposal-class-properties',
	'@babel/plugin-proposal-object-rest-spread',
	'@babel/plugin-syntax-dynamic-import',
	'@babel/plugin-transform-runtime',
	[
		'emotion',
		{
			autoLabel: isLocalDevelopment,
			cssPropOptimization: true,
			labelFormat: '[local]',
			sourceMap: isLocalDevelopment,
		},
	],
]

module.exports = {
	plugins: (
		isLocalDevelopment
		? [
			'react-hot-loader/babel',
			...plugins,
		]
		: plugins
	),
	presets: [
		[
			'@babel/preset-env',
			{
				modules: false,
				useBuiltIns: false,
			},
		],
		[
			'@babel/preset-react',
			{ development: isLocalDevelopment },
		],
	],
}
