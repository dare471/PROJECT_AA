import { useEffect } from 'react'
import { UseMutationOptions } from 'react-query'

import { ElevatorApi } from '@/7.shared/api'
import { useMutationCustom } from '@/7.shared/lib/react-query'

export const useFetchElevatorMarkers = (options: UseMutationOptions) => {
	const [elevatorMarkersMutation, abortElevatorMarkers] = useMutationCustom((signal, id: string) => {
		return ElevatorApi.getElevatorMarkers({ signal })
	}, options)

	useEffect(() => {
		return () => {
			abortElevatorMarkers.current?.abort()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return [elevatorMarkersMutation, abortElevatorMarkers] as const
}
