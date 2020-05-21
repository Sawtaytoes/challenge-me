import SawtaytoesFramework from './SawtaytoesFramework'

const Header = ({
	title,
	subtitle,
}) => (
	SawtaytoesFramework
	.div(
		SawtaytoesFramework
		.div(
			SawtaytoesFramework
			.h1(title),
			SawtaytoesFramework
			.h2(subtitle),
		),
		SawtaytoesFramework
		.div(
			{
				style: 'text-align: center;',
			},
			SawtaytoesFramework
			.img({
				src: 'https://placehold.it/300x200',
			}),
		)
	)
)

export default Header
