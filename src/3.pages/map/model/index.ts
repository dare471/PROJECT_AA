import { useCallback, useEffect, useState } from 'react'
import { calculateCenter } from '@/5.features/map'
import { useFetchClient, useFetchCountry, useFetchDistrict, useFetchRegion } from '@/6.entities/map'
import { IClientInfo } from '@/7.shared/api'
import { useQP, useSessionStorage } from '@/7.shared/lib'
import { IListPolygons, IPosition, TErrorActions, TModals, TSuccessActions } from '../types'
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
		y: 48,
		zoom: 5.45
	})

	const { deleteQP, getQP } = useQP()
	const illustrateDataQP = getQP(illustrate)
	const regionQP = getQP('region')
	const districtQP = getQP('district')
	const clientQP = getQP('client')
	const clientPolygonQP = getQP('clientPolygon')

	const [sessionCountry, setSessionCountry] = useSessionStorage<any>('country', null)
	const [countryMutation] = useFetchCountry({
		onSuccess(res: any, sessionCountry: any) {
			if (!sessionCountry) {
				handleSuccess({ res, actions: ['list', 'session-country'] })
			} else {
				handleSuccess({ res, actions: ['list'] })
			}
		},
		onError(err) {
			handleError({ err, actions: ['delete', 'modal'] })
		}
	})
	const [regionMutation] = useFetchRegion({
		onSuccess(res, id) {
			handleSuccess({ res, actions: ['list-change', 'position'], params: { id } })
		},
		onError(err) {
			handleError({ err, actions: ['delete', 'modal'], params: { key: 'region' } })
		}
	})
	const [districtMutation] = useFetchDistrict({
		onSuccess(res: any) {
			handleSuccess({ res, actions: ['position'] })
		},
		onError(err) {
			handleError({ err, actions: ['delete', 'modal'], params: { key: 'district' } })
		}
	})
	const [clientMutation] = useFetchClient({
		onSuccess(res: any) {
			handleSuccess({ res, actions: ['position', 'client-info'] })
		},
		onError(err) {
			handleError({ err, actions: ['delete', 'modal'], params: { key: 'client' } })
		}
	})
	const [clientPolygonMutation] = useFetchClient({
		onSuccess(res: any) {
			handleSuccess({ res, actions: ['position'] })
		},
		onError(err) {
			handleError({ err, actions: ['delete', 'modal'], params: { key: 'clientPolygon' } })
		}
	})

	useEffect(() => {
		if (sessionCountry) {
			countryMutation.mutate(sessionCountry)
		} else {
			countryMutation.mutate('')
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

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

	// useEffect(() => {
	// 	if (illustrate === 'region') {
	// 		districtMutation.reset()
	// 		clientMutation.reset()
	// 		clientPolygonMutation.reset()
	// 		setTimeout(() => {
	// 			deleteQP('district')
	// 			deleteQP('client')
	// 			deleteQP('clientPolygon')
	// 		}, 2000)
	// 	} else if (illustrate === 'district') {
	// 		clientMutation.reset()
	// 		clientPolygonMutation.reset()
	// 		setTimeout(() => {
	// 			deleteQP('client')
	// 			deleteQP('clientPolygon')
	// 		}, 2000)
	// 	} else if (illustrate === 'client') {
	// 		clientPolygonMutation.reset()
	// 		setTimeout(() => {
	// 			deleteQP('clientPolygon')
	// 		}, 2000)
	// 	}
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [illustrateDataQP])

	useEffect(() => {
		if (illustrateDataQP) {
			if (illustrate === 'region') {
				regionMutation.mutate(illustrateDataQP)
			}
			if (illustrate === 'district') {
				districtMutation.mutate(illustrateDataQP)
			}
			if (illustrate === 'client') {
				clientMutation.mutate(illustrateDataQP)
			}
			if (illustrate === 'clientPolygon') {
				clientPolygonMutation.mutate(illustrateDataQP)
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [illustrate, illustrateDataQP])

	useEffect(() => {
		if (mode) {
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
			setPosition(prev => (data[0]?.GEOMETRY_RINGS ? calculateCenter(data, 6) : prev))
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
		if (actions.includes('delete')) {
			deleteQP(params?.key)
		}
	}

	const handlePrev = useCallback(() => {
		setModal({
			type: 'confirm',
			data: {
				message: 'Do u want to view map teleport',
				onClickAccept() {
					setModal(null)
					setMode(true)
					handlePolygon()
				},
				onClickReject() {
					setModal(null)
					setMode(false)
				}
			}
		})
	}, [])

	const handlePolygon = useCallback(() => {
		if (regionQP) {
			setTimeout(async () => {
				setIllustrate('region')
			}, 500)
		}

		if (districtQP) {
			setTimeout(async () => {
				setIllustrate('district')
			}, 1000)
		}

		if (clientQP) {
			setTimeout(async () => {
				setIllustrate('client')
			}, 2000)
		}

		if (clientPolygonQP) {
			setTimeout(async () => {
				setIllustrate('clientPolygon')
			}, 3000)
		}
	}, [])

	return {
		isLoad,
		modal,
		setModal,
		listPolygons,
		clientInfo,
		position,
		illustrate,
		setIllustrate,
		countryMutation,
		regionMutation,
		districtMutation,
		clientMutation,
		clientPolygonMutation,
		handlePrev
	}
}
