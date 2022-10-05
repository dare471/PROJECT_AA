import { useNavigate } from 'react-router'
import { NavLink } from 'react-router-dom'
import { Layout } from '@/layouts'
import { ROUTE_TO_HOME, ROUTE_TO_LOGIN, ROUTE_TO_MAP } from '@/shared/lib'
import { Button } from '@/shared/ui'
import './styles.scss'
import { useAuth } from '@/entities/user'

export const ProtectedHeader = () => {
	const { userLogout } = useAuth()
	const navigate = useNavigate()

	const handleKeyUp = (e: any) => {
		if (e.key === 'Enter') {
			navigate(ROUTE_TO_HOME())
		}
	}

	return (
		<Layout.Header>
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
						<NavLink to={ROUTE_TO_HOME()}>Главная</NavLink>
					</li>
					<li className='header_li second'>
						<NavLink to={ROUTE_TO_MAP()}>Карта</NavLink>
					</li>
				</ul>
			</div>
			<div className='header_right'>
				<ul className='header_right_ul'>
					<li className='header_li first'>
						<Button
							onClick={() => {
								userLogout()
								navigate(ROUTE_TO_LOGIN())
							}}
							onKeyUp={() => userLogout()}
						>
							Выход
						</Button>
					</li>
				</ul>
			</div>
		</Layout.Header>
	)
}
