import { FC, memo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { TCurrentIllustrate } from '@/3.pages'
import { MapCollapse } from '@/5.features/map-collapse'
import { MapIin } from '@/6.entities/map-iin'
import { Button, Divider } from '@/7.shared/ui'
import { IMapLeftSidebarProps } from './types'
import './styles.scss'

export const MapLeftSidebar: FC<IMapLeftSidebarProps> = memo(({ listPolygons, handlePolygon }) => {
	const [searchParams] = useSearchParams()
	const illustrateParam = searchParams.get('illustrate') as TCurrentIllustrate

	const handleClick = () => {
		handlePolygon(['prev'])
	}

	return (
		<div className='map_sidebar_wrapper'>
			<aside className='map_sidebar'>
				<div className='map_sidebar_header_wrapper'>
					<header className='map_sidebar_header'>
						<span className={`map_sidebar_header_item${illustrateParam === 'country' ? ' active' : ''}`}>Cтрана</span>
						<span className={`map_sidebar_header_item${illustrateParam === 'region' ? ' active' : ''}`}>Область</span>
						<span className={`map_sidebar_header_item${illustrateParam === 'district' ? ' active' : ''}`}>Район</span>
						<span className={`map_sidebar_header_item${illustrateParam === 'client' ? ' active' : ''}`}>Полигон</span>
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
						<MapCollapse listPolygons={listPolygons} />
					</div>
				</section>
			</aside>
		</div>
	)
})
