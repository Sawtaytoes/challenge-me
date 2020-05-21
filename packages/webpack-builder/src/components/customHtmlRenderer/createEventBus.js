const logButtonClicked = ({
	detail = {},
}) => {
	if (detail.type !== 'BUTTON_CLICKED') {
		return
	}

	console.info(detail.id)
}

const createEventBus = () => {
	window.addEventListener(
		'customFrameworkEventBus',
		logButtonClicked,
	)

	return () => (
		window.removeEventListener(
			'customFrameworkEventBus',
			logButtonClicked,
		)
	)
}

export default createEventBus
