const { from } = require('rxjs')
const { tap } = require('rxjs/operators')

const htmlTagNames = [
	'div',
	'h1',
	'p',
	'span',
]

const initialProperties = {
	createStringFormatter: {
		value: ({
			formatHtmlString,
			htmlTagName,
		}) => (
			...values
		) => (
			formatHtmlString(
				`<${htmlTagName}>`
				.concat(...values)
				.concat(`</${htmlTagName}>`)
			)
		),
	},
}

const createFormatterProperties = (
	formatHtmlString = value => value,
) => (
	htmlTagNames
	.reduce(
		(
			getterFunctions,
			htmlTagName
		) => ({
			...getterFunctions,
			[htmlTagName]: {
				get: function() {
					const stringFormatter = (
						this.createStringFormatter({
							formatHtmlString,
							htmlTagName,
						})
					)

					const properties = (
						createFormatterProperties(
							stringFormatter,
						)
					)

					Object.defineProperties(
						stringFormatter,
						properties,
					)

					return stringFormatter
				},
			},
		}),
		initialProperties,
	)
)

const Format = (
	Object.create(
		{},
		createFormatterProperties(),
	)
)

const formatObjectCreate$ = (
	from([
		Format.div.h1('Hello world!'),
		Format.div.p.span('Hello world2!'),
	])
	.pipe(
		tap((
			html,
		) => {
			console.info(
				'formatObjectCreate$',
				html,
			)
		}),
	)
)

module.exports = formatObjectCreate$
