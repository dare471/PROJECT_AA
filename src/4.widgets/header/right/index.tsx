import { NavLink } from 'react-router-dom'

import { UserPanel } from '@/5.features/user'

import { UserAvatar } from '@/6.entities/user'

import { routes } from '@/7.shared/config'
import { NavbarItem } from '@/7.shared/ui'

import './styles.scss'

type THeaderRightProps = {
	userPanel: boolean
	signIn: boolean
}

export const HeaderRight = (props: THeaderRightProps) => {
	const { userPanel, signIn } = props
	return (
		<div className='header_right'>
			<ul className='header_right_ul'>
				{userPanel && (
					<NavbarItem content={<UserAvatar />} classNameLink={() => `header_link`}>
						<UserPanel />
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
