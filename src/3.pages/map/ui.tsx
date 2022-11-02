import { Modals } from '@/4.widgets/modals'

import { useTitle } from '@/7.shared/lib/dom'
import { namedLazy } from '@/7.shared/lib/hooks'
import { Article, Lazy, LoadBlocker } from '@/7.shared/ui'

import { useMapModel } from './model/model'
import './styles.scss'
import { MapToolbar } from './toolbar'

const Map = namedLazy(() => import('@/5.features/map'), 'Map')
const MapSidebar = namedLazy(() => import('./sidebar'), 'MapSidebar')

export const MapPage = () => {
	useTitle('Map')
	const { isLoad, modal, setModal, listPolygons, position, illustrate, setIllustrate, handleMutation, handlePrev } =
		useMapModel()

	return (
		<Article className='map_article'>
			<Lazy
				content={
					<MapSidebar
						listPolygons={listPolygons}
						handlePrev={handlePrev}
						illustrate={illustrate}
						setIllustrate={setIllustrate}
						handleMutation={handleMutation}
						setModal={setModal}
					/>
				}
			/>

			<Lazy
				content={
					<Map
						position={position}
						handleMutation={handleMutation}
						illustrate={illustrate}
						setIllustrate={setIllustrate}
					/>
				}
			/>

			<Lazy
				content={<MapToolbar illustrate={illustrate} setIllustrate={setIllustrate} handleMutation={handleMutation} />}
			/>

			{isLoad && <LoadBlocker />}
			<Modals modal={modal} setModal={setModal} />
		</Article>
	)
}
