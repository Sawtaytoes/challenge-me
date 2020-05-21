import Body from './Body'
import Button from './Button'
import Header from './Header'
import SawtaytoesFramework from './SawtaytoesFramework'

const CustomFrameworkApp = () => (
	SawtaytoesFramework
	.div(
		{
			style: (
				[
					'align-items: center;',
					'display: flex;',
					'flex-direction: column;',
					'font-size: 40px;',
					'margin-top: 20px;',
					'margin-bottom: 20px;',
				]
				.join('')
			),
		},
		Header({
			title: 'My Custom Framework',
			subtitle: 'Someone asked me a question.',
		}),
		Button({
			id: 1,
			text: 'BUTTON 1 CLICK ME!',
		}),
		Button({
			id: 2,
			text: 'BUTTON 2 CLICK ME!',
		}),
		Body(),
	)
)

export default CustomFrameworkApp
