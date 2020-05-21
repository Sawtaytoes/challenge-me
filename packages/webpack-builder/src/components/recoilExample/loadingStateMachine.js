import { atom } from 'recoil'

const loadingStates = {
	LOADING: 'LOADING',
	LOADED: 'LOADED',
}

const loadingStateMachine = (
	atom({
		default: loadingStates.LOADING,
		key: 'loadingStateMachine',
	})
)

loadingStateMachine.states = loadingStates

export default loadingStateMachine
