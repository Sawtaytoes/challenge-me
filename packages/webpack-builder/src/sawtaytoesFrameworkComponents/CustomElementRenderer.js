import React, { useEffect } from 'react'

import createEventBus from './createEventBus'
import CustomFrameworkApp from './CustomFrameworkApp'

const renderToDom = (
	renderedCustomElement,
	domElement,
) => {
	domElement.innerHTML = (
		renderedCustomElement
	)
}

const CustomElementRenderer = () => {
	useEffect(createEventBus)

	useEffect(() => {
		renderToDom(
			CustomFrameworkApp(),
			(
				document
				.getElementById(
					'custom-framework-root'
				)
			),
		)
	})

	return (
		<div id="custom-framework-root" />
	)
}

export default CustomElementRenderer
