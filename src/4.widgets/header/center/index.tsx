import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { ROUTE_TO_HOME, ROUTE_TO_MAP } from '@/7.shared/config'
import { IHeaderCenterProps } from './types'
import './styles.scss'

export const HeaderCenter: FC<IHeaderCenterProps> = ({ home, map }) => {
	return (
		<div className='header_center'>
			<ul className='header_center_ul'>
				{home && (
					<li className='header_li first'>
						<NavLink
							className={({ isActive }) => {
								return `link${(isActive && ' active') || ''}`
							}}
							to={ROUTE_TO_HOME()}
						>
							Главная
						</NavLink>
					</li>
				)}
				{map && (
					<li className='header_li second'>
						<NavLink
							className={({ isActive }) => {
								return `link${(isActive && ' active') || ''}`
							}}
							to={ROUTE_TO_MAP()}
						>
							Карта
						</NavLink>
					</li>
				)}
			</ul>
		</div>
	)
}
