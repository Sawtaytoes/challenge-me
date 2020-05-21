import { atom } from 'recoil'

const typingSpeedState = (
	atom({
		default: 0,
		key: 'typingSpeedState',
	})
)

export default typingSpeedState
