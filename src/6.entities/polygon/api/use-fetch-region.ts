import { useEffect } from 'react'
import { UseMutationOptions } from 'react-query'

import { PolygonApi } from '@/7.shared/api'
import { useMutationCustom } from '@/7.shared/lib/react-query'

type TAction = 'mode:first' | 'mode:second' | 'filter'

export const useFetchRegion = (options: UseMutationOptions) => {
	const [regionMutation, abortRegion] = useMutationCustom(
		(signal, { id, data, action }: { id: string; data?: any; action: TAction }) => {
			if (action === 'mode:second') {
				return PolygonApi.getRegionWithClientPolygons({ id, signal })
			} else if (action === 'mode:first') {
				return PolygonApi.getRegionWithDistrict({ id, signal })
			} else {
				return PolygonApi.getRegionWithFilterClientPolygons({ id, data, signal })
			}
		},
		options
	)

	useEffect(() => {
		return () => {
			abortRegion.current?.abort()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return [regionMutation, abortRegion] as const
}
