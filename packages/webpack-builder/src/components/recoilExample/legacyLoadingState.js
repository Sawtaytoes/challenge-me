import { atom } from 'recoil'

const legacyLoadingState = (
	atom({
		default: true,
		key: 'legacyLoadingState',
	})
)

export default legacyLoadingState
