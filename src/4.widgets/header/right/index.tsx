import { FC } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ROUTE_TO_LOGIN } from '@/7.shared/config'
import { IHeaderRightProps } from './types'
import { HeaderDropDown } from './dropdown'
import './styles.scss'

export const HeaderRight: FC<IHeaderRightProps> = ({ dropdown, signIn }) => {
	const navigate = useNavigate()

	return (
		<div className='header_right'>
			<ul className='header_right_ul'>
				<li className='header_li first'>
					{dropdown && <HeaderDropDown />}
					{signIn && (
						<NavLink
							className={({ isActive }) => {
								return `link${(isActive && ' active') || ''}`
							}}
							to={ROUTE_TO_LOGIN()}
						>
							Вход
						</NavLink>
					)}
				</li>
			</ul>
		</div>
	)
}
