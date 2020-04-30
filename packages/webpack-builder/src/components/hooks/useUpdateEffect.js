import { useEffect, useRef } from 'react'

const useUpdateEffect = (
	callback,
	dependencies,
) => {
	const isFirstMountRef = useRef(true)

	useEffect(
		() => {
			if (isFirstMountRef.current) {
				isFirstMountRef.current = false
			}
			else {
				callback()
			}
		},
		dependencies,
	)
}

export default useUpdateEffect
