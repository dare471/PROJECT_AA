import { Suspense } from 'react'
import { Modals } from '@/4.widgets/modals'
import { namedLazy } from '@/7.shared/lib'
import { Article, Load, LoadBlocker } from '@/7.shared/ui'
import { useMapModel } from './model'
import { Sidebar } from './sidebar'
import './styles.scss'
import { MapTemplate } from './template'

const Map = namedLazy(() => import('@/5.features/map'), 'Map')

export const MapPage = () => {
	const {
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
	} = useMapModel()

	return (
		<MapTemplate>
			<Article className='map_article'>
				<Sidebar.Left listPolygons={listPolygons} handlePrev={handlePrev} illustrate={illustrate} />

				<Suspense fallback={<Load />}>
					<Map
						position={position}
						countryMutation={countryMutation}
						regionMutation={regionMutation}
						districtMutation={districtMutation}
						clientMutation={clientMutation}
						clientPolygonMutation={clientPolygonMutation}
						illustrate={illustrate}
						setIllustrate={setIllustrate}
					/>
				</Suspense>

				<Sidebar.Right clientInfo={clientInfo} setModal={setModal} />

				{isLoad && <LoadBlocker />}
				<Modals modal={modal} setModal={setModal} />
			</Article>
		</MapTemplate>
	)
}
