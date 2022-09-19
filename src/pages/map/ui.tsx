import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { DefaultLayout } from '@/layouts/default '
import { MapSidebar } from '@/widgets/sidebar/map'
import { illustrateChecker } from '@/features/map/lib'
import { TPolygons, getAreaPolygon } from '@/shared/api'
import { namedLazy } from '@/shared/lib/named-lazy'
import { Article } from '@/shared/ui'
import { Main } from '@/shared/ui/main'
import { IIllustratePolygons, IPosition, TCurrentIllustrate } from './types'
import './styles.scss'

const Map = namedLazy(() => import('@/features/map'), 'Map')

export const MapPage = () => {
	const [position, setPosition] = useState<IPosition>({
		x: 70,
		y: 50,
		zoom: 5
	})
	const [currentPolygons, setCurrentPolygons] = useState<TPolygons>(null)
	const [illustratePolygons, setIllustratePolygons] = useState<IIllustratePolygons>({ current: 'area' })
	const [searchParams] = useSearchParams()
	const illustrateValue = searchParams.get('illustrate') as TCurrentIllustrate

	useEffect(() => {
		if (searchParams.has('illustrate')) {
			setIllustratePolygons({ current: illustrateValue })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [illustrateValue])

	// get areaPolygons
	useEffect(() => {
		if (illustrateChecker(illustratePolygons, 'area') && !setCurrentPolygons) {
			console.log('start area')
			;(async () => {
				try {
					const res = await getAreaPolygon()
					setCurrentPolygons(res)
				} catch (e) {
					console.log('Error AreaPolygon', e)
				}
			})()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<DefaultLayout>
			<Main className='map_main'>
				<Article className='map_article'>
					<div className='map_page'>
						<div className='map_item map_item_1'>
							<div className='map_sidebar_concealer'></div>
							<div className='map_sidebar_wrapper'>
								<MapSidebar
									illustratePolygons={illustratePolygons}
									currentPolygons={currentPolygons}
									setCurrentPolygons={setCurrentPolygons}
								/>
							</div>
						</div>
						<div className='map_item map_item_2'>
							<Suspense fallback={<div>...loading</div>}>
								<Map position={position} currentPolygons={currentPolygons} setCurrentPolygons={setCurrentPolygons} />
							</Suspense>
						</div>
					</div>
				</Article>
			</Main>
		</DefaultLayout>
	)
}
