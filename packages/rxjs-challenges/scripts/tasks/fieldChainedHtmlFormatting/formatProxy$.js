const { from } = require('rxjs')
const { tap } = require('rxjs/operators')

const htmlTagNames = [
	'div',
	'h1',
	'p',
	'span',
]

const initialProperties = {
	createStringFormatter: ({
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
}

const createFormatterProperties = (
	formatHtmlString = value => value,
) => (
	formatHtmlString
)

const Format = (
	new Proxy(
		initialProperties,
		{
			get: (proxy, propertyName) => (
				console.log(propertyName)||
				proxy[propertyName]
				|| proxy
			),
		}
	)
)

const formatProxy$ = (
	from([
		Format.div.h1('Hello world!'),
		Format.div.p.span('Hello world2!'),
	])
	.pipe(
		tap((
			html,
		) => {
			console.info(
				'formatProxy$',
				html,
			)
		}),
	)
)

module.exports = formatProxy$
