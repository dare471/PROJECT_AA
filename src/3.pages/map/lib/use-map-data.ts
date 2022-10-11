import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useMapSpecific } from '@/5.features/map/lib/use-map-specific'
import { IClientInfo, PolygonApi } from '@/7.shared/api'
import { useMutationCustom, useSessionStorage } from '@/7.shared/lib'
import { IListPolygons, IPosition, TCurrentIllustrate, TModals } from '../types'
import { calculateCenter } from './calculateCenter'

export const useMapData = () => {
	const [isLoad, setIsLoad] = useState<boolean>(false)
	const [modal, setModal] = useState<TModals>(null)
	const [clientInfo, setClientInfo] = useState<IClientInfo | null>(null)
	const [listPolygons, setListPolygons] = useState<IListPolygons | null>(null)
	const [position, setPosition] = useState<IPosition>({
		x: 68,
		y: 48,
		zoom: 5.45
	})
	const { setChangedParam, removeParam, setIllustrate } = useMapSpecific()

	const [searchParams] = useSearchParams()
	const modeParam = searchParams.get('mode')
	const regionParam = searchParams.get('region')
	const districtParam = searchParams.get('district')
	const clientParam = searchParams.get('client')
	const clientPolygonParam = searchParams.get('clientPolygon')
	const changedParam = searchParams.get('changed')
	const illustrateParam = searchParams.get('illustrate') as TCurrentIllustrate

	const [sessionCountry, setSessionCountry] = useSessionStorage<any>('country', null)
	const [countryMutation, abortCountry] = useMutationCustom(
		signal => {
			if (sessionCountry) {
				return sessionCountry
			} else {
				return PolygonApi.getCountry({ signal })
			}
		},
		{
			onSuccess(res: any) {
				const { data } = res

				if (!sessionCountry) {
					setListPolygons(data)
					setSessionCountry(res)
				} else {
					setListPolygons(data)
				}
			},
			onError(err: TypeError) {
				setModal({ type: 'error', data: { error: err.message } })
			}
		}
	)

	const [regionMutation, abortRegion] = useMutationCustom(
		(signal, id: string) => {
			return PolygonApi.getRegion({ id, signal })
		},
		{
			onSuccess(res: any, id: string) {
				const { data } = res

				setListPolygons((prev: any) => {
					const polygonIndex = prev.findIndex((item: any) => item.KATO === id)
					const newListPolygon = prev.slice()
					newListPolygon[polygonIndex] = { ...newListPolygon[polygonIndex], children: data }
					return newListPolygon
				})
				setPosition(prev => (data[0]?.GEOMETRY_RINGS ? calculateCenter(data, 6) : prev))
			},
			onError(err: TypeError) {
				removeParam('region')
				setModal({ type: 'error', data: { error: err.message } })
			}
		}
	)

	//all clients polygons
	const [districtMutation, abortDistrict] = useMutationCustom(
		(signal, id: string) => {
			return PolygonApi.getDistrict({ signal, id })
		},
		{
			onSuccess(res: any) {
				const { data } = res
				setPosition(prev => (data[0]?.GEOMETRY_RINGS ? calculateCenter(data, 9) : prev))
			},
			onError(err: TypeError) {
				removeParam('district')
				setModal({ type: 'error', data: { error: err.message } })
			}
		}
	)

	const [clientMutation, abortClient] = useMutationCustom(
		(signal, id: string) => {
			return PolygonApi.getClient({ signal, id })
		},
		{
			onSuccess(res: any) {
				const { data } = res

				setPosition(prev => (data[0]?.GEOMETRY_RINGS ? calculateCenter(data, 10) : prev))
				setClientInfo(res)
			},
			onError(err: TypeError) {
				removeParam('client')
				setModal({ type: 'error', data: { error: err.message } })
			}
		}
	)

	const [clientPolygonMutation, abortClientPolygon] = useMutationCustom(
		(signal, id: string) => {
			return PolygonApi.getClientPolygon({ signal, id })
		},
		{
			onSuccess(res: any) {
				const { data } = res
				setPosition(prev => (data[0]?.GEOMETRY_RINGS ? calculateCenter(data, 10) : prev))
			},
			onError(err: TypeError) {
				// removeParam('clientPolygon')
				setModal({ type: 'error', data: { error: err.message } })
			}
		}
	)

	useEffect(() => {
		countryMutation.mutate('get country with all regions')

		return () => {
			;[abortCountry, abortRegion, abortDistrict, abortClient, abortClientPolygon].forEach(abortItem =>
				abortItem.current?.abort()
			)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (changedParam) {
			removeParam('changed')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [changedParam])

	useEffect(() => {
		if (
			countryMutation.isLoading ||
			regionMutation.isLoading ||
			districtMutation.isLoading ||
			clientMutation.isLoading ||
			clientPolygonMutation.isLoading
		) {
			setIsLoad(true)
		} else {
			setIsLoad(false)
		}
	}, [
		countryMutation.isLoading,
		regionMutation.isLoading,
		districtMutation.isLoading,
		clientMutation.isLoading,
		clientPolygonMutation.isLoading
	])

	useEffect(() => {
		if (modeParam === 'true') {
			setModal({
				type: 'confirm',
				data: {
					message: 'Do u want to view map teleport',
					onClickAccept() {
						setModal(null)
						handlePolygon()
					},
					onClickReject() {
						setModal(null)
					}
				}
			})
		} else {
			setIllustrate()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [modeParam])

	const handlePolygon = useCallback(
		() => {
			if (regionParam) {
				setTimeout(async () => {
					setIllustrate('region')
					setChangedParam('prev')
				})
			}

			if (districtParam) {
				setTimeout(async () => {
					setIllustrate('district')
					setChangedParam('prev')
				}, 1000)
			}

			if (clientParam) {
				setTimeout(async () => {
					setIllustrate('client')
					setChangedParam('prev')
				}, 2000)
			}

			if (clientPolygonParam) {
				setTimeout(async () => {
					setIllustrate('clientPolygon')
					setChangedParam('prev')
				}, 3000)
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	)

	useEffect(() => {
		removeParam('district')
		removeParam('client')
		removeParam('clientPolygon')
		districtMutation.reset()
		clientMutation.reset()
		clientPolygonMutation.reset()
	}, [regionParam])

	useEffect(() => {
		removeParam('client')
		removeParam('clientPolygon')
		clientMutation.reset()
		clientPolygonMutation.reset()
	}, [districtParam])

	useEffect(() => {
		removeParam('clientPolygon')
		clientPolygonMutation.reset()
	}, [clientParam])

	useEffect(() => {
		if (
			illustrateParam === 'region' &&
			(changedParam === 'collapse' || changedParam === 'prev' || changedParam === 'map') &&
			regionParam
		) {
			regionMutation.mutate(regionParam as string)
		}
		if (
			illustrateParam === 'district' &&
			(changedParam === 'collapse' || changedParam === 'prev' || changedParam === 'map') &&
			districtParam
		) {
			districtMutation.mutate(districtParam as string)
		}
		if (
			illustrateParam === 'client' &&
			(changedParam === 'collapse' || changedParam === 'prev' || changedParam === 'map') &&
			clientParam
		) {
			clientMutation.mutate(clientParam as string)
		}

		if (
			illustrateParam === 'clientPolygon' &&
			(changedParam === 'client' || changedParam === 'prev' || changedParam === 'map') &&
			clientPolygonParam
		) {
			clientPolygonMutation.mutate(clientPolygonParam as string)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [changedParam])

	return {
		isLoad,
		modal,
		setModal,
		listPolygons,
		clientInfo,
		position,
		handlePolygon,
		countryMutation,
		regionMutation,
		districtMutation,
		clientMutation,
		clientPolygonMutation
	}
}
