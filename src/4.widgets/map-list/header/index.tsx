import { TPolygonType } from '@/7.shared/api'
import { Divider } from '@/7.shared/ui'

import './styles.scss'

type TLeftSidebarHeaderProps = {
	illustrate: TPolygonType
}

export const LeftSidebarHeader = (props: TLeftSidebarHeaderProps) => {
	const { illustrate } = props

	return (
		<div className='map_sidebar_header_wrapper'>
			<header className='map_sidebar_header'>
				<span className={`map_sidebar_header_item${illustrate === 'country' ? ' active' : ''}`}>Cтрана</span>
				<span className={`map_sidebar_header_item${illustrate === 'region' ? ' active' : ''}`}>Область</span>
				<span className={`map_sidebar_header_item${illustrate === 'district' ? ' active' : ''}`}>Район</span>
				<span className={`map_sidebar_header_item${illustrate === 'clientPolygons' ? ' active' : ''}`}>Полигон</span>
			</header>
			<Divider className='sidebar_header_divider' />
		</div>
	)
}
