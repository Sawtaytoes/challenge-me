const { from } = require('rxjs')
const { tap } = require('rxjs/operators')

const htmlTagNames = [
	'div',
	'h1',
	'p',
	'span',
]

const createStringFormatter = ({
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
)

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
				get: () => {
					const stringFormatter = (
						createStringFormatter({
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
		{},
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
		Format.div.p.span('Foo', 'Bar'),
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
