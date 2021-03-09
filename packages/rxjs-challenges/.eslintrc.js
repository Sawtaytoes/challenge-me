module.exports = {
	extends: [
		'@ghadyani-eslint/node',
	],
	rules: {
		'@ghadyani-eslint/arrow-body-parens/parens': 'off', // TEMP. Remove 'off' when fixed in @ghadyani-eslint
		'array-bracket-newline': [
			'warn',
			{
				minItems: 1,
				multiline: true,
			},
		],
		'arrow-body-style': 'warn',
		'arrow-parens': [
			'warn',
			'always',
		],
		'import/no-unresolved': [
			'warn',
			{
				ignore: [
					'\\$',
				],
			},
		],
		'indent': 'off', // TEMP. Remove 'off' when fixed in @ghadyani-eslint
		'no-unexpected-multiline': 'off',
		'semi': [
			'warn',
			'never',
		],
		'semi-spacing': 'warn',
		'semi-style': [
			'warn',
			'first',
		],
	},
}
