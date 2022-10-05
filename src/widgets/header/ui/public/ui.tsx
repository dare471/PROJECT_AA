import { useNavigate } from 'react-router'
import { NavLink } from 'react-router-dom'
import { Layout } from '@/layouts'
import { ROUTE_TO_HOME, ROUTE_TO_LOGIN } from '@/shared/lib'
import './styles.scss'

export const PublicHeader = () => {
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
				</ul>
			</div>
			<div className='header_right'>
				<ul className='header_right_ul'>
					<li className='header_li first'>
						<NavLink to={ROUTE_TO_LOGIN()}>Вход</NavLink>
					</li>
				</ul>
			</div>
		</Layout.Header>
	)
}
