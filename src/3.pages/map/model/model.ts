import { useCallback, useEffect, useState } from 'react'
import { StringParam, useQueryParam } from 'use-query-params'

import { TModals } from '@/4.widgets/modals'

import { calculateCenter, TPosition } from '@/5.features/map'

import { useFetchElevatorMarkers } from '@/6.entities/elevators'
import {
	TListPolygons,
	useFetchClientPolygon,
	useFetchClientPolygons,
	useFetchCountry,
	useFetchDistrict,
	useFetchRegion
} from '@/6.entities/polygon'

import { TPolygonType } from '@/7.shared/api'
import { useSessionStorage } from '@/7.shared/lib/browser'

import { useIllustrateQP } from './use-qp-illustrate'
import { useQPMode } from './use-qp-mode'

type TSuccessActions = 'position' | 'list' | 'list-change' | 'client-details' | 'district-details' | 'session-country'

type TErrorActions = 'modal'

export const useMapModel = () => {
	const [illustrate, setIllustrate] = useIllustrateQP()
	const [mode, setMode] = useQPMode()
	const [isLoad, setIsLoad] = useState<boolean>(false)
	const [modal, setModal] = useState<TModals>()
	const [listPolygons, setListPolygons] = useState<TListPolygons[]>()
	const [position, setPosition] = useState<TPosition>({
		x: 68,
		y: 48
	})

	const [regionQP, setRegionQP] = useQueryParam('region', StringParam)
	const [districtQP, setDistrictQP] = useQueryParam('district', StringParam)
	const [clientPolygonsQP, setClientPolygonsQP] = useQueryParam('clientPolygons', StringParam)
	const [clientPolygonQP, setClientPolygonQP] = useQueryParam('clientPolygon', StringParam)
	const illustrateData =
		illustrate === 'region'
			? regionQP
			: illustrate === 'district'
			? districtQP
			: illustrate === 'clientPolygons'
			? clientPolygonsQP
			: illustrate === 'clientPolygon'
			? clientPolygonQP
			: null

	const [sessionCountry, setSessionCountry] = useSessionStorage<any>('country', null)
	const [countryMutation, abortCountry] = useFetchCountry({
		onSuccess(res, sessionCountry: any) {
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
		onSuccess(res) {
			handleSuccess({ res, actions: ['position', 'district-details'] })
		},
		onError(err) {
			handleError({ err, actions: ['modal'], params: { key: 'district' } })
			setDistrictQP(null)
		}
	})
	const [clientPolygonsMutation, abortClientPolygons] = useFetchClientPolygons({
		onSuccess(res) {
			handleSuccess({ res, actions: ['position', 'client-details'] })
		},
		onError(err) {
			handleError({ err, actions: ['modal'], params: { key: 'clientPolygons' } })
			setClientPolygonsQP(null)
		}
	})
	const [clientPolygonMutation, abortClientPolygon] = useFetchClientPolygon({
		onSuccess(res) {
			handleSuccess({ res, actions: ['position'] })
		},
		onError(err) {
			handleError({ err, actions: ['modal'], params: { key: 'clientPolygon' } })
			setClientPolygonQP(null)
		}
	})
	const [elevatorMarkersMutation, abortElevatorMarkers] = useFetchElevatorMarkers({
		onError(err) {
			handleError({ err, actions: ['modal'], params: { key: 'elevatorMarkers' } })
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
		if (!clientPolygonsQP) {
			clientPolygonsMutation.reset()
		}
		if (!clientPolygonQP) {
			clientPolygonMutation.reset()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [regionQP, districtQP, clientPolygonsQP, clientPolygonQP])

	useEffect(() => {
		if (
			countryMutation.isLoading ||
			regionMutation.isLoading ||
			districtMutation.isLoading ||
			clientPolygonsMutation.isLoading ||
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
		clientPolygonsMutation.isLoading,
		clientPolygonMutation.isLoading
	])

	useEffect(() => {
		// console.log(illustrate, illustrateData, 'mutate')
		if (illustrateData) {
			if (mode === 'second') {
				if (illustrate === 'region') {
					regionMutation.mutate({ id: illustrateData, action: 'mode:second' })
				}
				if (illustrate === 'clientPolygons') {
					clientPolygonsMutation.mutate(illustrateData)
				}
				if (illustrate === 'clientPolygon') {
					clientPolygonMutation.mutate(illustrateData)
				}
			} else if (mode === 'first' || mode === 'push' || mode === 'reset') {
				if (illustrate === 'region') {
					regionMutation.mutate({ id: illustrateData, action: 'mode:first' })
				}
				if (illustrate === 'district') {
					districtMutation.mutate(illustrateData)
				}
				if (illustrate === 'clientPolygons') {
					clientPolygonsMutation.mutate(illustrateData)
				}
				if (illustrate === 'clientPolygon') {
					clientPolygonMutation.mutate(illustrateData)
				}
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [illustrate, illustrateData, mode])

	useEffect(() => {
		if (mode === 'reset') {
			handlePolygon()
		}
		if (mode === 'second') {
			elevatorMarkersMutation.mutate('')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mode])

	const handleSuccess = ({ res, actions, params }: { res: any; actions: TSuccessActions[]; params?: any }) => {
		if (actions.includes('list')) {
			setListPolygons(res)
		}
		if (actions.includes('list-change')) {
			setListPolygons(prev => {
				if (prev) {
					const polygonIndex = prev.findIndex((item: any) => item.cato === params.id)
					const newListPolygon = prev.slice()
					newListPolygon[polygonIndex] = { ...newListPolygon[polygonIndex], children: res }
					return newListPolygon
				}

				return prev
			})
		}
		if (actions.includes('position')) {
			setPosition(prev =>
				res[0].geometry_rings ? calculateCenter(res[0]) : res[20].geometry_rings ? calculateCenter(res[20]) : prev
			)
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
					setModal(undefined)
					setMode('reset')
					handlePolygon()
				},
				onClickReject() {
					setModal(undefined)
					setMode('first')
				}
			}
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
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

		if (clientPolygonsQP) {
			setTimeout(async () => {
				setIllustrate('clientPolygons')
			}, 6500)
		}

		if (clientPolygonQP) {
			setTimeout(async () => {
				setIllustrate('clientPolygon')
			}, 7500)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [regionQP, districtQP, clientPolygonsQP, clientPolygonQP])

	const handleMutation = useCallback(
		(mutation: TPolygonType) => {
			if (mutation === 'country') {
				return [countryMutation, abortCountry] as const
			}
			if (mutation === 'region') {
				return [regionMutation, abortRegion] as const
			}
			if (mutation === 'district') {
				return [districtMutation, abortDistrict] as const
			}
			if (mutation === 'clientPolygons') {
				return [clientPolygonsMutation, abortClientPolygons] as const
			}
			if (mutation === 'clientPolygon') {
				return [clientPolygonMutation, abortClientPolygon] as const
			}
			if (mutation === 'elevatorMarkers') {
				return [elevatorMarkersMutation, abortElevatorMarkers] as const
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[
			countryMutation,
			regionMutation,
			districtMutation,
			clientPolygonsMutation,
			clientPolygonMutation,
			abortCountry,
			abortRegion,
			abortDistrict,
			abortClientPolygons,
			abortClientPolygon
		]
	)

	return {
		isLoad,
		modal,
		setModal,
		listPolygons,
		position,
		illustrate,
		setIllustrate,
		handleMutation,
		handlePrev
	}
}
