import { useEffect } from 'react'
import { UseMutationOptions } from 'react-query'
import { PolygonApi } from '@/7.shared/api'
import { useMutationCustom } from '@/7.shared/lib'

export const useFetchRegion = (options: UseMutationOptions) => {
	const [regionMutation, abortRegion] = useMutationCustom((signal, id: string) => {
		return PolygonApi.getRegion({ id, signal })
	}, options)

	useEffect(() => {
		return () => {
			abortRegion.current?.abort()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return [regionMutation, abortRegion] as const
}
