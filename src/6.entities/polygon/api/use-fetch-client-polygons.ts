import { useEffect } from 'react'
import { UseMutationOptions } from 'react-query'

import { PolygonApi } from '@/7.shared/api'
import { useMutationCustom } from '@/7.shared/lib/react-query'

export const useFetchClientPolygons = (options: UseMutationOptions) => {
	const [clientPolygonsMutation, abortClientPolygons] = useMutationCustom((signal, id: string) => {
		return PolygonApi.getClientPolygonsWithClientPolygon({ signal, id })
	}, options)

	useEffect(() => {
		return () => {
			abortClientPolygons.current?.abort()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return [clientPolygonsMutation, abortClientPolygons] as const
}
