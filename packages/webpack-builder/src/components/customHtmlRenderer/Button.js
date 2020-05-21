import SawtaytoesFramework from './SawtaytoesFramework'

const createEventFunctionString = (
	functionString,
) => (
	`(function() {${functionString}})()`
)

const Button = ({
	id,
	text,
}) => (
	SawtaytoesFramework
	.div(
		SawtaytoesFramework
		.button(
			{
				onclick: (
					createEventFunctionString(`
						window
						.dispatchEvent(
							new CustomEvent(
								'customFrameworkEventBus',
								{
									detail: {
										id: ${id},
										type: 'BUTTON_CLICKED',
									}
								},
							)
						)
					`)
				),
				style: (
					[
						'font-size: 24px;',
						'padding: 20px;',
					]
					.join('')
				),
			},
			text,
		),
	)
)

export default Button
