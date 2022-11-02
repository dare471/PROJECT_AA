import { useEffect } from 'react'
import { UseMutationOptions } from 'react-query'

import { PolygonApi } from '@/7.shared/api'
import { useMutationCustom } from '@/7.shared/lib/react-query'

export const useFetchDistrict = (options: UseMutationOptions) => {
	const [districtMutation, abortDistrict] = useMutationCustom((signal, id: string) => {
		return PolygonApi.getDistrictWithClientPolygons({ signal, id })
	}, options)

	useEffect(() => {
		return () => {
			abortDistrict.current?.abort()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return [districtMutation, abortDistrict] as const
}
