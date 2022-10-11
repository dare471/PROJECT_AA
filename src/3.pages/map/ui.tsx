import { Suspense } from 'react'
import { Modals } from '@/4.widgets/modals'
import { MapSidebar } from '@/4.widgets/sidebar'
import { namedLazy } from '@/7.shared/lib'
import { Article, Load, LoadBlocker, Main } from '@/7.shared/ui'
import { useMapData } from './lib'
import './styles.scss'

const Map = namedLazy(() => import('@/5.features/map'), 'Map')

export const MapPage = () => {
	const {
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
	} = useMapData()

	return (
		<Main className='map_main'>
			<Article className='map_article'>
				<MapSidebar.Left listPolygons={listPolygons} handlePolygon={handlePolygon} />

				<Suspense fallback={<Load />}>
					<Map
						position={position}
						countryMutation={countryMutation}
						regionMutation={regionMutation}
						districtMutation={districtMutation}
						clientMutation={clientMutation}
						clientPolygonMutation={clientPolygonMutation}
					/>
				</Suspense>

				<MapSidebar.Right clientInfo={clientInfo} setModal={setModal} />

				{isLoad && <LoadBlocker />}
				<Modals modal={modal} setModal={setModal} />
			</Article>
		</Main>
	)
}
