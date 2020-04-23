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

const proxyOptions = {
	get: (
		proxy,
		propertyName,
	) => (
		htmlTagNames
		.includes(propertyName)
		? (
			new Proxy(
				createStringFormatter({
					formatHtmlString: (
						Object.is(
							typeof(proxy),
							'function',
						)
						? proxy
						: value => value
					),
					htmlTagName: propertyName,
				}),
				proxyOptions,
			)
		)
		: (
			Reflect
			.get(
				proxy,
				propertyName,
			)
		)
	),
}

const Format = (
	new Proxy(
		{},
		proxyOptions,
	)
)

const formatProxy$ = (
	from([
		Format.div.h1('Hello world!'),
		Format.div.p.span('Foo', 'Bar'),
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
