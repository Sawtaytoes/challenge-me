const renderAttributes = (
	attributes
) => (
	Object
	.entries(attributes)
	.map(([
		attributeName,
		attributeValue,
	]) => (
		attributeName
		.concat('=')
		.concat(`"${attributeValue}"`)
	))
	.join(' ')
)

const createHtmlElementBuilder = ({
	htmlFormatter = value => value,
	htmlTagName,
}) => (
	possibleAttributes,
	...possibleChildren
) => {
	const attributes = (
		typeof(possibleAttributes) === 'object'
		? possibleAttributes
		: {}
	)

	const children = (
		typeof(possibleAttributes) === 'object'
		? possibleChildren
		: (
			[possibleAttributes]
			.concat(possibleChildren)
		)
	)

	return (
		children
		.length > 0
		? (
			htmlFormatter(
				`<${htmlTagName} `
				.concat(`${
					renderAttributes(
						attributes
					)
				}`)
				.concat('>')
				.concat(
					children
					.join('')
				)
				.concat(`</${htmlTagName}>`)
			)
		)
		: (
			`<${htmlTagName} `
			.concat(`${
				renderAttributes(
					attributes
				)
			}`)
			.concat(' />')
		)
	)
}

const proxyProperties = {
	get: (
		proxy,
		propertyName,
	) => (
		new Proxy(
			createHtmlElementBuilder({
				htmlTagName: propertyName,
				htmlFormatter: (
					typeof(proxy) === 'function'
					? proxy
					: value => value
				),
			}),
			proxyProperties,
		)
	),
}

const SawtaytoesFramework = (
	new Proxy(
		{},
		proxyProperties,
	)
)

export default SawtaytoesFramework
