import { useEffect } from 'react'
import { UseMutationOptions } from 'react-query'
import { PolygonApi } from '@/7.shared/api'
import { useMutationCustom } from '@/7.shared/lib'

export const useFetchCountry = (options: UseMutationOptions) => {
	const [countryMutation, abortCountry] = useMutationCustom((signal, sessionCountry?: any) => {
		if (sessionCountry) {
			return sessionCountry
		} else {
			return PolygonApi.getCountry({ signal })
		}
	}, options)

	useEffect(() => {
		return () => {
			abortCountry.current?.abort()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return [countryMutation, abortCountry] as const
}
