module.exports = {
	extends: [
		"@ghadyani-eslint/node",
		"@ghadyani-eslint/web",
	],
	plugins: [
		'react-hooks',
	],
	rules: {
		'import/no-unresolved': [
			'warn',
			{ ignore: ['\$'] }
		],
		'react-hooks/exhaustive-deps': 'warn',
		'react-hooks/rules-of-hooks': 'error',
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
}
