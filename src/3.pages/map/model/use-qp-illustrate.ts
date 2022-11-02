import { useEffect, useState } from 'react'
import { useQueryParam } from 'use-query-params'

import { TPolygonType } from '@/7.shared/api/polygon/types'

import { TMode } from './use-qp-mode'

export const useIllustrateQP = () => {
	const [illustrate, setIllustrate] = useState<TPolygonType>()
	const [illustrateQP, setIllustrateQP] = useQueryParam<TPolygonType>('illustrate')
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
		} else if (illustrate === null && modeQP === 'first') {
			setIllustrate('country')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [illustrate])

	return [illustrate, setIllustrate] as const
}
