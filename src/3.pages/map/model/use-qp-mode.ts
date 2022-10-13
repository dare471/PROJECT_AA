import { useEffect, useState } from 'react'
import { useMapQP } from '@/5.features/map/lib'

export const useQPMode = () => {
	const [mode, setMode] = useState<boolean>(false)
	const { getModeQP, setModeQP } = useMapQP()
	const modeQP = getModeQP()

	useEffect(() => {
		if (modeQP === 'true') {
			setMode(true)
		} else if (modeQP === 'false') {
			setMode(false)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (mode) {
			setModeQP('true')
		} else {
			setModeQP('false')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mode])

	return [mode, setMode] as const
}
