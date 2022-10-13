import { useEffect } from 'react'
import { UseMutationOptions } from 'react-query'
import { PolygonApi } from '@/7.shared/api'
import { useMutationCustom } from '@/7.shared/lib'

export const useFetchClientPolygon = (options: UseMutationOptions) => {
	const [clientPolygonMutation, abortClientPolygon] = useMutationCustom((signal, id: string) => {
		return PolygonApi.getClientPolygon({ signal, id })
	}, options)

	useEffect(() => {
		return () => {
			abortClientPolygon.current?.abort()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return [clientPolygonMutation, abortClientPolygon] as const
}
