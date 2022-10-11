import { FC } from 'react'
import { useNavigate } from 'react-router'
import { NavLink } from 'react-router-dom'
import { Template } from '@/4.widgets/templates'
import { useAuth } from '@/6.entities/user'
import { ROUTE_TO_HOME, ROUTE_TO_LOGIN, ROUTE_TO_MAP } from '@/7.shared/config'
import { Button } from '@/7.shared/ui'
import { IPublicHeaderProps } from './types'
import './styles.scss'

export const PublicHeader: FC<IPublicHeaderProps> = ({ auth }) => {
	const { userLogout } = useAuth()
	const navigate = useNavigate()

	const handleKeyUp = (e: any) => {
		if (e.key === 'Enter') {
			navigate(ROUTE_TO_HOME())
		}
	}

	return (
		<Template.Header>
			<div className='header_left'>
				<div
					className='header_logo_wrapper'
					onClick={() => navigate(ROUTE_TO_HOME())}
					role='button'
					tabIndex={0}
					onKeyUp={handleKeyUp}
				>
					<h3 className='header_logo_text'>AlemAgro</h3>
				</div>
			</div>
			<div className='header_center'>
				<ul className='header_center_ul'>
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
				</ul>
			</div>
			<div className='header_right'>
				<ul className='header_right_ul'>
					<li className='header_li first'>
						{auth ? (
							<Button
								boxShadow={false}
								onClick={() => {
									userLogout()
									navigate(ROUTE_TO_LOGIN())
								}}
								onKeyUp={() => userLogout()}
							>
								Выход
							</Button>
						) : (
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
		</Template.Header>
	)
}
