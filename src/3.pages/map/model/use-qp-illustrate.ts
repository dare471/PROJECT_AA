import { useEffect, useState } from 'react'
import { useQueryParam } from 'use-query-params'
import { TIllustrate, TMode } from '../types'

export const useIllustrateQP = () => {
	const [illustrate, setIllustrate] = useState<TIllustrate>(null)
	const [illustrateQP, setIllustrateQP] = useQueryParam<TIllustrate>('illustrate')
	const [modeQP] = useQueryParam<TMode>('mode')

	useEffect(() => {
		if (modeQP === 'push') {
			setIllustrate(illustrateQP)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [modeQP])

	useEffect(() => {
		// console.log(illustrate, 'illustrate')
		if (illustrate) {
			setIllustrateQP(illustrate)
		} else if (illustrate === null && modeQP === 'off') {
			setIllustrate('country')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [illustrate])

	return [illustrate, setIllustrate] as const
}
