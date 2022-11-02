import { routes } from '@/7.shared/config'
import { NavbarItem } from '@/7.shared/ui'

import './styles.scss'

type THeaderCenterProps = {
	home: boolean
	map: boolean
}

export const HeaderCenter = (props: THeaderCenterProps) => {
	const { home, map } = props

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
