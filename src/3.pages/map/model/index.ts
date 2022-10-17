import { useCallback, useEffect, useState } from 'react'
import { StringParam, useQueryParam } from 'use-query-params'
import { calculateCenter } from '@/4.widgets/map'
import {
	useFetchClient,
	useFetchClientPolygon,
	useFetchCountry,
	useFetchDistrict,
	useFetchRegion
} from '@/6.entities/polygon'
import { IClientInfo } from '@/7.shared/api'
import { useSessionStorage } from '@/7.shared/lib'
import { IListPolygons, IPosition, TErrorActions, TModals, TSuccessActions } from '../types'
import { TIllustrate } from '../types'
import { useIllustrateQP } from './use-qp-illustrate'
import { useQPMode } from './use-qp-mode'

export const useMapModel = () => {
	const [illustrate, setIllustrate] = useIllustrateQP()
	const [mode, setMode] = useQPMode()
	const [isLoad, setIsLoad] = useState<boolean>(false)
	const [modal, setModal] = useState<TModals>(null)
	const [clientInfo, setClientInfo] = useState<IClientInfo | null>(null)
	const [listPolygons, setListPolygons] = useState<IListPolygons | null>(null)
	const [position, setPosition] = useState<IPosition>({
		x: 68,
		y: 48
	})

	const [regionQP, setRegionQP] = useQueryParam('region', StringParam)
	const [districtQP, setDistrictQP] = useQueryParam('district', StringParam)
	const [clientQP, setClientQP] = useQueryParam('client', StringParam)
	const [clientPolygonQP, setClientPolygonQP] = useQueryParam('clientPolygon', StringParam)
	const illustrateData =
		illustrate === 'region'
			? regionQP
			: illustrate === 'district'
			? districtQP
			: illustrate === 'client'
			? clientQP
			: illustrate === 'clientPolygon'
			? clientPolygonQP
			: null

	const [sessionCountry, setSessionCountry] = useSessionStorage<any>('country', null)
	const [countryMutation, abortCountry] = useFetchCountry({
		onSuccess(res: any, sessionCountry: any) {
			if (!sessionCountry) {
				handleSuccess({ res, actions: ['list', 'session-country'] })
			} else {
				handleSuccess({ res, actions: ['list'] })
			}
		},
		onError(err) {
			handleError({ err, actions: ['modal'] })
		}
	})
	const [regionMutation, abortRegion] = useFetchRegion({
		onSuccess(res, id) {
			handleSuccess({ res, actions: ['list-change', 'position'], params: { id } })
		},
		onError(err) {
			handleError({ err, actions: ['modal'], params: { key: 'region' } })
			setRegionQP(null)
		}
	})
	const [districtMutation, abortDistrict] = useFetchDistrict({
		onSuccess(res: any) {
			handleSuccess({ res, actions: ['position'] })
		},
		onError(err) {
			handleError({ err, actions: ['modal'], params: { key: 'district' } })
			setDistrictQP(null)
		}
	})
	const [clientMutation, abortClient] = useFetchClient({
		onSuccess(res: any) {
			handleSuccess({ res, actions: ['position', 'client-info'] })
		},
		onError(err) {
			handleError({ err, actions: ['modal'], params: { key: 'client' } })
			setClientQP(null)
		}
	})
	const [clientPolygonMutation, abortClientPolygon] = useFetchClientPolygon({
		onSuccess(res: any) {
			handleSuccess({ res, actions: ['position'] })
		},
		onError(err) {
			handleError({ err, actions: ['modal'], params: { key: 'clientPolygon' } })
			setClientPolygonQP(null)
		}
	})

	useEffect(() => {
		countryMutation.mutate(sessionCountry ? sessionCountry : '')

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (!regionQP) {
			regionMutation.reset()
		}
		if (!districtQP) {
			districtMutation.reset()
		}
		if (!clientQP) {
			clientMutation.reset()
		}
		if (!clientPolygonQP) {
			clientPolygonMutation.reset()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [regionQP, districtQP, clientQP, clientPolygonQP])

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
		// console.log(illustrate, illustrateData, 'mutate')
		if (illustrateData) {
			if (illustrate === 'region') {
				regionMutation.mutate(illustrateData)
			}
			if (illustrate === 'district') {
				districtMutation.mutate(illustrateData)
			}
			if (illustrate === 'client') {
				clientMutation.mutate(illustrateData)
			}
			if (illustrate === 'clientPolygon') {
				clientPolygonMutation.mutate(illustrateData)
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [illustrate, illustrateData])

	useEffect(() => {
		if (mode === 'reset') {
			handlePolygon()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mode])

	const handleSuccess = ({ res, actions, params }: { res: any; actions: TSuccessActions[]; params?: any }) => {
		const { data } = res

		if (actions.includes('list')) {
			setListPolygons(data)
		}
		if (actions.includes('list-change')) {
			setListPolygons((prev: any) => {
				const polygonIndex = prev.findIndex((item: any) => item.KATO === params?.id)
				const newListPolygon = prev.slice()
				newListPolygon[polygonIndex] = { ...newListPolygon[polygonIndex], children: data }
				return newListPolygon
			})
		}
		if (actions.includes('position')) {
			setPosition(prev => (data[0]?.GEOMETRY_RINGS ? calculateCenter(data) : prev))
		}
		if (actions.includes('client-info')) {
			setClientInfo(res)
		}
		if (actions.includes('session-country')) {
			setSessionCountry(res)
		}
	}

	const handleError = ({ err, actions, params }: { err: unknown; actions: TErrorActions[]; params?: any }) => {
		const error = err as TypeError
		if (actions.includes('modal')) {
			setModal({ type: 'error', data: { error: error.message } })
		}
	}

	const handlePrev = useCallback(() => {
		setModal({
			type: 'confirm',
			data: {
				message: 'Do u want to view map teleport',
				onClickAccept() {
					setModal(null)
					setMode('reset')
					handlePolygon()
				},
				onClickReject() {
					setModal(null)
					setMode('off')
				}
			}
		})
	}, [])

	const handlePolygon = useCallback(() => {
		if (regionQP) {
			setTimeout(async () => {
				setIllustrate('region')
			}, 3000)
		}

		if (districtQP) {
			setTimeout(async () => {
				setIllustrate('district')
			}, 4500)
		}

		if (clientQP) {
			setTimeout(async () => {
				setIllustrate('client')
			}, 6500)
		}

		if (clientPolygonQP) {
			setTimeout(async () => {
				setIllustrate('clientPolygon')
			}, 7500)
		}
	}, [regionQP, districtQP, clientQP, clientPolygonQP])

	const handleMutation = useCallback(
		(mutation: TIllustrate) => {
			if (mutation === 'country') {
				return [countryMutation, abortCountry] as const
			}
			if (mutation === 'region') {
				return [regionMutation, abortRegion] as const
			}
			if (mutation === 'district') {
				return [districtMutation, abortDistrict] as const
			}
			if (mutation === 'client') {
				return [clientMutation, abortClient] as const
			}
			if (mutation === 'clientPolygon') {
				return [clientPolygonMutation, abortClientPolygon] as const
			}
		},
		[
			countryMutation,
			regionMutation,
			districtMutation,
			clientMutation,
			clientPolygonMutation,
			abortCountry,
			abortRegion,
			abortDistrict,
			abortClient,
			abortClientPolygon
		]
	)

	return {
		isLoad,
		modal,
		setModal,
		listPolygons,
		clientInfo,
		position,
		illustrate,
		setIllustrate,
		handleMutation,
		handlePrev
	}
}
