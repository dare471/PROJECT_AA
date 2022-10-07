import { Suspense, useCallback, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useSearchParams } from 'react-router-dom'
import { MapModals } from '@/4.widgets/modal'
import { MapInfoSidebar, MapSidebar } from '@/4.widgets/sidebar'
import { IClientInfo, TPolygon, polygonApi } from '@/7.shared/api'
import { namedLazy, useSessionStorage } from '@/7.shared/lib'
import { Article, Load, LoadBlocker, Main } from '@/7.shared/ui'
import type { IListPolygons, IPosition, TCurrentIllustrate, THandleChangeAction, TModals } from './types'
import { getForAllPolygons } from './api'
import { calculateCenter } from './lib'
import './styles.scss'

const Map = namedLazy(() => import('@/5.features/map'), 'Map')

export const MapPage = () => {
	const [position, setPosition] = useState<IPosition>({
		x: 68,
		y: 48,
		zoom: 5.45
	})
	const [childrenPolygon, setChildrenPolygon] = useState<TPolygon>(null)
	const [listPolygons, setListPolygons] = useState<IListPolygons | null>(null)
	const [clientInfo, setClientInfo] = useState<IClientInfo | null>(null)

	const [isLoad, setIsLoad] = useState<boolean>(false)
	const [modal, setModal] = useState<TModals>(null)

	const [searchParams, setSearchParams] = useSearchParams()
	const modeParam = searchParams.get('mode')
	const regionParam = searchParams.get('region')
	const districtParam = searchParams.get('district')
	const polygonParam = searchParams.get('polygon')
	const polygonDetailParam = searchParams.get('polygonDetail')
	// const illustrateParam = searchParams.get('illustrate') as TCurrentIllustrate

	// const [region, setArea] = useSessionStorage<any>('region', null)
	// const regionPolygons = useQuery(
	// 	'area',
	// 	({ signal }) => {
	// 		if (region) {
	// 			return Promise.resolve(region)
	// 		} else {
	// 			return polygonApi.getRegionPolygons({ signal })
	// 		}
	// 	},
	// 	{
	// 		enabled: illustrateParam === 'region',
	// 		onSuccess(data) {
	// 			if (!region) {
	// 				setArea(data)
	// 			}
	// 		},
	// 		onError(err: TypeError) {
	// 			setModal({ type: 'error', data: { error: err.message } })
	// 		}
	// 	}
	// )
	// const districtPolygons = useQuery(
	// 	'area',
	// 	({ signal }) => {
	// 			return polygonApi.getDistrictPolygons({ districtParam, signal })
	// 	},
	// 	{
	// enabled: illustrateParam === 'district' && districtParam,
	// 		onError(err: TypeError) {
	// 			setModal({ type: 'error', data: { error: err.message } })
	// 		}
	// 	}
	// )
	// const districtPolygons = useQuery(
	// 	'area',
	// 	({ signal }) => {
	// 			return polygonApi.getPolygons({ polygonParam, signal })
	// 	},
	// 	{
	// enabled: illustrateParam === 'polygon' && polygonParam,
	// 		onError(err: TypeError) {
	// 			setModal({ type: 'error', data: { error: err.message } })
	// 		}
	// 	}
	// )

	useEffect(() => {
		if (modeParam === 'true') {
			handlePolygon()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [modeParam])

	const handlePolygon = useCallback(
		async (action?: THandleChangeAction[]) => {
			if (regionParam) {
				setTimeout(async () => {
					await handleChangeCurrentPolygon('region', regionParam, action ? ['request', ...action] : ['request'])
				})
			}
			if (districtParam) {
				setTimeout(async () => {
					await handleChangeCurrentPolygon('district', districtParam, action ? ['request', ...action] : ['request'])
				}, 1000)
			}
			if (polygonParam) {
				setTimeout(async () => {
					await handleChangeCurrentPolygon('polygon', polygonParam, action ? ['request', ...action] : ['request'])
				}, 2000)
			}
			if (polygonDetailParam) {
				setTimeout(async () => {
					await handleChangeCurrentPolygon(
						'polygonDetail',
						polygonDetailParam,
						action ? ['request', ...action] : ['request']
					)
				}, 3000)
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[regionParam, districtParam, polygonParam, polygonDetailParam]
	)

	const handleChangeCurrentPolygon = useCallback(async (type: string, id: string, actions: THandleChangeAction[]) => {
		try {
			searchParams.set(type, id)
			searchParams.set('illustrate', type)
			setSearchParams(searchParams)
			if (actions.includes('map')) {
				searchParams.set('changed', 'map')
				setSearchParams(searchParams)
			}
			if (actions.includes('prev')) {
				searchParams.set('changed', 'prev')
				setSearchParams(searchParams)
			}
			if (actions.includes('request')) {
				setIsLoad(true)
				const { res, resType } = await getForAllPolygons(type, id, fetch)
				if (resType === 'region') {
					setListPolygons((prev: any) => {
						const polygonIndex = prev.data.findIndex((item: any) => item.KATO === id)
						const newListPolygon = prev.data.slice()
						newListPolygon[polygonIndex] = { ...newListPolygon[polygonIndex], children: res?.data }
						return { ...prev, data: newListPolygon }
					})

					setTimeout(() => {
						setPosition(prev => (res.data[0]?.GEOMETRY_RINGS ? calculateCenter(res?.data, 6) : prev))
						setChildrenPolygon(prev => (res.data[0]?.GEOMETRY_RINGS ? res : prev))
					})
				} else if (resType === 'district') {
					setTimeout(() => {
						setPosition(prev => (res?.data[0]?.GEOMETRY_RINGS ? calculateCenter(res?.data, 9) : prev))
						setChildrenPolygon(prev => (res.data[0]?.GEOMETRY_RINGS ? res : prev))
					})
				} else if (resType === 'polygon') {
					setTimeout(() => {
						setPosition(prev => (res.data[0]?.GEOMETRY_RINGS ? calculateCenter(res?.data, 10) : prev))
						setChildrenPolygon(prev => (res.data[0]?.GEOMETRY_RINGS ? res : prev))
						setClientInfo(res)
					})
				} else if (resType === 'polygonDetail') {
					setTimeout(() => {
						setPosition(prev => (res.data[0]?.GEOMETRY_RINGS ? calculateCenter(res?.data, 10) : prev))
						setChildrenPolygon(prev => (res.data[0]?.GEOMETRY_RINGS ? res : prev))
					})
				}
				setIsLoad(false)
			}

			return true
		} catch (err: any) {
			setIsLoad(false)
			setModal({ type: 'error', data: { error: err.message } })
			return false
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<Main className='map_main'>
			<Article className='map_article'>
				<MapSidebar
					listPolygons={listPolygons}
					handleChangeCurrentPolygon={handleChangeCurrentPolygon}
					handlePolygon={handlePolygon}
				/>

				<Suspense fallback={<Load />}>
					<Map
						position={position}
						childrenPolygon={childrenPolygon}
						setChildrenPolygon={setChildrenPolygon}
						handleChangeCurrentPolygon={handleChangeCurrentPolygon}
					/>
				</Suspense>

				<MapInfoSidebar
					clientInfo={clientInfo}
					handleChangeCurrentPolygon={handleChangeCurrentPolygon}
					setModal={setModal}
				/>

				{isLoad && <LoadBlocker />}
				<MapModals modal={modal} setModal={setModal} />
			</Article>
		</Main>
	)
}
