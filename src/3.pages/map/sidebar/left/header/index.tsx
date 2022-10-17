import { FC } from 'react'
import { Divider } from '@/7.shared/ui'
import { ILeftSidebarHeaderProps } from './types'
import './styles.scss'

export const LeftSidebarHeader: FC<ILeftSidebarHeaderProps> = ({ illustrate }) => {
	return (
		<div className='map_sidebar_header_wrapper'>
			<header className='map_sidebar_header'>
				<span className={`map_sidebar_header_item${illustrate === 'country' ? ' active' : ''}`}>Cтрана</span>
				<span className={`map_sidebar_header_item${illustrate === 'region' ? ' active' : ''}`}>Область</span>
				<span className={`map_sidebar_header_item${illustrate === 'district' ? ' active' : ''}`}>Район</span>
				<span className={`map_sidebar_header_item${illustrate === 'client' ? ' active' : ''}`}>Полигон</span>
			</header>
			<Divider className='sidebar_header_divider' />
		</div>
	)
}
