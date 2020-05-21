import React from 'react'
import { useRecoilValue } from 'recoil'

import loadingStateMachine from './loadingStateMachine'

const Footer = () => {
	const loadingState = useRecoilValue(loadingStateMachine)

	return (
		<footer>
			{loadingState}
		</footer>
	)
}

export default Footer
