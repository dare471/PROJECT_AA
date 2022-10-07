import { FC, memo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MapCollapse } from '@/5.features/map-collapse'
import { MapIin } from '@/5.features/map-iin'
import { Button, Divider } from '@/7.shared/ui'
import { IMapSidebarProps } from './types'
import './styles.scss'

export const MapSidebar: FC<IMapSidebarProps> = memo(({ listPolygons, handleChangeCurrentPolygon, handlePolygon }) => {
	const [searchParams] = useSearchParams()
	const illustrateParam = searchParams.get('illustrate')

	const handleClick = () => {
		handlePolygon(['prev'])
	}

	return (
		<div className='map_sidebar_wrapper'>
			<aside className='map_sidebar'>
				<div className='map_sidebar_header_wrapper'>
					<header className='map_sidebar_header'>
						<span className={`map_sidebar_header_item${illustrateParam === 'country' ? ' active' : ''}`}>Страна</span>
						<span className={`map_sidebar_header_item${illustrateParam === 'region' ? ' active' : ''}`}>Область</span>
						<span className={`map_sidebar_header_item${illustrateParam === 'district' ? ' active' : ''}`}>Район</span>
						<span className={`map_sidebar_header_item${illustrateParam === 'polygon' ? ' active' : ''}`}>Полигон</span>
					</header>
					<Divider className='map_sidebar_divider sidebar_header_divider' />
				</div>
				<section className='map_sidebar_content'>
					<MapIin handleChangeCurrentPolygon={handleChangeCurrentPolygon} />

					<div>
						<Button className='map_sidebar_button' onClick={handleClick}>
							Вернуться к последнему
						</Button>
					</div>

					<Divider className='map_sidebar_divider' />
					<div className='map_sidebar_collapse_wrapper'>
						<MapCollapse listPolygons={listPolygons} handleChangeCurrentPolygon={handleChangeCurrentPolygon} />
					</div>
				</section>
			</aside>
		</div>
	)
})
