import { useEffect } from 'react'
import { UseMutationOptions } from 'react-query'
import { PolygonApi } from '@/7.shared/api'
import { useMutationCustom } from '@/7.shared/lib'

export const useFetchClient = (options: UseMutationOptions) => {
	const [clientMutation, abortClient] = useMutationCustom((signal, id: string) => {
		return PolygonApi.getClient({ signal, id })
	}, options)

	useEffect(() => {
		return () => {
			abortClient.current?.abort()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return [clientMutation, abortClient] as const
}
