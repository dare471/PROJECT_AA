import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { DefaultLayout } from '@/layouts/default '
import { MapSidebar } from '@/widgets/sidebar/map'
import { illustrateChecker } from '@/features/map/lib'
import { IPolygon, TPolygons, getAreaPolygon, getDistrictPolygon, getPolygons } from '@/shared/api'
import { namedLazy } from '@/shared/lib/named-lazy'
import { Article } from '@/shared/ui'
import { Main } from '@/shared/ui/main'
import { IIllustratePolygons, IPosition } from './types'
import './styles.scss'

const Map = namedLazy(() => import('@/features/map'), 'Map')

export const MapPage = () => {
	const [position, setPosition] = useState<IPosition>({
		x: 70,
		y: 50,
		zoom: 5
	})
	const [areaPolygons, setAreaPolygons] = useState<TPolygons>(null)
	const [districtPolygons, setDistrictPolygons] = useState<TPolygons>(null)
	const [polygons, setPolygons] = useState<TPolygons>(null)
	const [illustratePolygons, setIllustratePolygons] = useState<IIllustratePolygons>({
		area: true,
		district: false,
		polygon: false
	})
	const [activePolygon, setActivePolygon] = useState<IPolygon | null>(null)
	const [searchParams] = useSearchParams()
	const illustrateValue = searchParams.get('illustrate')

	useEffect(() => {
		if (searchParams.has('illustrate')) {
			setIllustratePolygons(prev => {
				const illustrateEntries = Object.entries(prev).map(([key]) => [key, false])
				const illustrate: string = searchParams.get('illustrate') || 'nothing'
				return { ...Object.fromEntries(illustrateEntries), [illustrate]: true }
			})
		}
	}, [illustrateValue])

	// get areaPolygons
	useEffect(() => {
		if (illustrateChecker(illustratePolygons, 'area') && !areaPolygons && illustrateValue === 'area') {
			console.log('start area')
			;(async () => {
				try {
					const res = await getDistrictPolygon()
					setAreaPolygons(res)
				} catch (e) {
					console.log('Error AreaPolygon', e)
				}
			})()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [illustratePolygons])

	// get districtPolygons
	useEffect(() => {
		if (illustrateChecker(illustratePolygons, 'district') && !districtPolygons && illustrateValue === 'district') {
			console.log('start district')
			;(async () => {
				try {
					const res = await getDistrictPolygon()
					setDistrictPolygons(res)
				} catch {
					console.log('error districtPolygon')
				}
			})()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [illustratePolygons])

	//get polygons
	useEffect(() => {
		if (illustrateChecker(illustratePolygons, 'polygon') && !polygons && illustrateValue === 'polygon') {
			console.log('start polygon')
			;(async () => {
				try {
					const res = await getPolygons()
					setPolygons(res)
				} catch (e) {
					console.log('Error AreaPolygon', e)
				}
			})()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [illustratePolygons])

	useEffect(() => {
		if (activePolygon && activePolygon.geometry.coordinates) {
			const maxX = activePolygon.geometry.coordinates[0]
				.slice()
				.reduce((prev: any, item: any) => (prev === null ? item[0] : Math.max(prev, item[0])), null)
			const minX = activePolygon.geometry.coordinates[0]
				.slice()
				.reduce((prev: any, item: any) => (prev === null ? item[0] : Math.min(prev, item[0])), null)
			const maxY = activePolygon.geometry.coordinates[0]
				.slice()
				.reduce((prev: any, item: any) => (prev === null ? item[1] : Math.max(prev, item[1])), null)
			const minY = activePolygon.geometry.coordinates[0]
				.slice()
				.reduce((prev: any, item: any) => (prev === null ? item[1] : Math.min(prev, item[1])), null)

			const newPosition = [maxX - (maxY - minY) / 2, maxY - (maxX - minX) / 2]
			setPosition({ x: newPosition[0], y: newPosition[1], zoom: 7.5 })
		}
	}, [activePolygon])

	return (
		<DefaultLayout>
			<Main className='map_main'>
				<Article className='map_article'>
					<div className='map_page'>
						<div className='map_item map_item_1'>
							<div className='map_sidebar_concealer'></div>
							<div className='map_sidebar_wrapper'>
								<MapSidebar
									position={position}
									setPosition={setPosition}
									illustratePolygons={illustratePolygons}
									areaPolygons={areaPolygons}
									districtPolygons={districtPolygons}
									polygons={polygons}
									activePolygon={activePolygon}
								/>
							</div>
						</div>
						<div className='map_item map_item_2'>
							<Suspense fallback={<div>...loading</div>}>
								<Map
									position={position}
									illustratePolygons={illustratePolygons}
									setIllustratePolygons={setIllustratePolygons}
									areaPolygons={areaPolygons}
									districtPolygons={districtPolygons}
									polygons={polygons}
									activePolygon={activePolygon}
									setActivePolygon={setActivePolygon}
								/>
							</Suspense>
						</div>
					</div>
				</Article>
			</Main>
		</DefaultLayout>
	)
}
