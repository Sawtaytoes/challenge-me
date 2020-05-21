import React from 'react'
import { useRecoilValue } from 'recoil'

import typingSpeedState from './typingSpeedState'

const Header = () => {
	const typingSpeed = useRecoilValue(typingSpeedState)

	return (
		<header>
			{typingSpeed}
		</header>
	)
}

export default Header
