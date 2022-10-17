import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { routes } from '@/7.shared/config'
import { NavbarItem } from '@/7.shared/ui'
import { IHeaderCenterProps } from './types'
import './styles.scss'

export const HeaderCenter: FC<IHeaderCenterProps> = ({ home, map }) => {
	return (
		<div className='header_center'>
			<ul className='header_center_ul'>
				{home && (
					<NavbarItem
						classNameLink={({ isActive }) => `header_link${isActive ? ' active' : ''}`}
						to={routes.home({})}
						content='Главная'
					/>
				)}
				{map && (
					<NavbarItem
						classNameLink={({ isActive }) => `header_link${isActive ? ' active' : ''}`}
						to={routes.map({})}
						content='Карта'
					/>
				)}
			</ul>
		</div>
	)
}
