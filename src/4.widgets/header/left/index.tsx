import { FC } from 'react'
import { useNavigate } from 'react-router'
import { routes } from '@/7.shared/config'
import { NavbarItem } from '@/7.shared/ui'
import { IHeaderLeftProps } from './types'
import './styles.scss'

export const HeaderLeft: FC<IHeaderLeftProps> = ({ logo }) => {
	const navigate = useNavigate()

	const handleKeyUp = (e: any) => {
		if (e.key === 'Enter') {
			navigate(routes.home({}))
		}
	}

	return (
		<div className='header_left'>
			<NavbarItem
				to={routes.home({})}
				classNameLink={({ isActive }) => (isActive ? '' : '')}
				content={
					<div
						className='header_logo_wrapper'
						onClick={() => navigate(routes.home({}))}
						role='button'
						tabIndex={0}
						onKeyUp={handleKeyUp}
					>
						<h3 className='header_logo_text'>AlemAgro</h3>
					</div>
				}
			></NavbarItem>
		</div>
	)
}
