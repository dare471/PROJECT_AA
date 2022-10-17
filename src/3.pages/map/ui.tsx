import { Suspense } from 'react'
import { Modals } from '@/4.widgets/modals'
import { namedLazy } from '@/7.shared/lib'
import { Article, Load, LoadBlocker } from '@/7.shared/ui'
import { useMapModel } from './model'
import './styles.scss'
import { MapTemplate } from './template'

// import { MapTabs } from './sidebar/tabs'

const Map = namedLazy(() => import('@/4.widgets/map'), 'Map')
const LeftSidebar = namedLazy(() => import('./sidebar/left'), 'MapLeftSidebar')
const RightSidebar = namedLazy(() => import('./sidebar/right'), 'MapRightSidebar')

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
		handleMutation,
		handlePrev
	} = useMapModel()

	return (
		<MapTemplate>
			<Article className='map_article'>
				{/* <MapTabs
					listPolygons={listPolygons}
					handlePrev={handlePrev}
					illustrate={illustrate}
					setIllustrate={setIllustrate}
					clientInfo={clientInfo}
					setModal={setModal}
				/> */}
				<LeftSidebar
					listPolygons={listPolygons}
					handlePrev={handlePrev}
					illustrate={illustrate}
					setIllustrate={setIllustrate}
				/>

				<Suspense fallback={<Load />}>
					<Map
						position={position}
						handleMutation={handleMutation}
						illustrate={illustrate}
						setIllustrate={setIllustrate}
					/>
				</Suspense>

				<RightSidebar clientInfo={clientInfo} setModal={setModal} setIllustrate={setIllustrate} />

				{isLoad && <LoadBlocker />}
				<Modals modal={modal} setModal={setModal} />
			</Article>
		</MapTemplate>
	)
}
