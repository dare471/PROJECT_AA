import { useEffect, useState } from 'react'
import { useQueryParam } from 'use-query-params'

export type TMode = 'first' | 'second' | 'reset' | 'push'

export const useQPMode = () => {
	const [mode, setMode] = useState<TMode>()
	const [modeQP, setModeQP] = useQueryParam<TMode>('mode')

	useEffect(() => {
		setMode(modeQP)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (mode) {
			setModeQP(mode)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mode])

	return [mode, setMode] as const
}
