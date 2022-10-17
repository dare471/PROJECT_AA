import { FC, memo } from 'react'
import { MapCollapse } from '@/5.features/map-collapse'
import { MapIin } from '@/5.features/map-iin'
import { Divider } from '@/7.shared/ui'
import { IMapLeftSidebarProps } from './types'
import { LeftSidebarResetButton } from './button'
import { LeftSidebarHeader } from './header'
import './styles.scss'

export const MapLeftSidebar: FC<IMapLeftSidebarProps> = memo(
	({ listPolygons, illustrate, setIllustrate, handlePrev }) => {
		const handleClick = () => {
			handlePrev()
		}

		return (
			<div className='map_sidebar_wrapper'>
				<aside className='map_sidebar'>
					<section className='map_sidebar_content'>
						<LeftSidebarHeader illustrate={illustrate} />
						<MapIin setIllustrate={setIllustrate} />
						<LeftSidebarResetButton onClick={handleClick} />
						<Divider className='map_sidebar_divider' />

						<MapCollapse listPolygons={listPolygons} illustrate={illustrate} setIllustrate={setIllustrate} />
					</section>
				</aside>
			</div>
		)
	}
)
