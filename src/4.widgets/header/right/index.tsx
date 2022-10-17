import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { UserMenu } from '@/5.features/user'
import { UserAvatar } from '@/6.entities/user'
import { routes } from '@/7.shared/config'
import { NavbarItem } from '@/7.shared/ui/navbar'
import { IHeaderRightProps } from './types'
import './styles.scss'

export const HeaderRight: FC<IHeaderRightProps> = ({ dropdown, signIn }) => {
	return (
		<div className='header_right'>
			<ul className='header_right_ul'>
				{dropdown && (
					<NavbarItem content={<UserAvatar />} classNameLink={() => `header_link`}>
						<UserMenu />
					</NavbarItem>
				)}
				{signIn && (
					<NavLink
						className={({ isActive }) => {
							return `header_link${isActive ? ' active' : ''}`
						}}
						to={routes.signIn({})}
					>
						Вход
					</NavLink>
				)}
			</ul>
		</div>
	)
}
