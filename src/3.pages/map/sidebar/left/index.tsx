import { FC, memo } from 'react'
import { MapCollapse } from '@/5.features/map-collapse'
import { MapIin } from '@/6.entities/map-iin'
import { Button, Divider } from '@/7.shared/ui'
import { IMapLeftSidebarProps } from './types'
import './styles.scss'

export const MapLeftSidebar: FC<IMapLeftSidebarProps> = memo(({ listPolygons, illustrate, handlePrev }) => {
	const handleClick = () => {
		handlePrev()
	}

	return (
		<div className='map_sidebar_wrapper'>
			<aside className='map_sidebar'>
				<div className='map_sidebar_header_wrapper'>
					<header className='map_sidebar_header'>
						<span className={`map_sidebar_header_item${illustrate === 'country' ? ' active' : ''}`}>Cтрана</span>
						<span className={`map_sidebar_header_item${illustrate === 'region' ? ' active' : ''}`}>Область</span>
						<span className={`map_sidebar_header_item${illustrate === 'district' ? ' active' : ''}`}>Район</span>
						<span className={`map_sidebar_header_item${illustrate === 'client' ? ' active' : ''}`}>Полигон</span>
					</header>
					<Divider className='map_sidebar_divider sidebar_header_divider' />
				</div>
				<section className='map_sidebar_content'>
					<MapIin />

					<div>
						<Button className='map_sidebar_button' boxShadow={false} onClick={handleClick}>
							Вернуться к последнему
						</Button>
					</div>

					<Divider className='map_sidebar_divider' />
					<div className='map_sidebar_collapse_wrapper'>
						<MapCollapse listPolygons={listPolygons} illustrate={illustrate} />
					</div>
				</section>
			</aside>
		</div>
	)
})
