import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { ROUTE_TO_HOME } from '@/shared/lib'
import { IHeaderProps } from './types'
import './styles.scss'

export const Header: FC<IHeaderProps> = () => {
	return (
		<header className='header'>
			<nav>
				<ul>
					<li>
						<NavLink to={ROUTE_TO_HOME()}>Home</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	)
}
