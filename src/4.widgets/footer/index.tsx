import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { ROUTE_TO_HOME, ROUTE_TO_MAP } from '@/7.shared/config'
import { Container, Divider } from '@/7.shared/ui'
import { IFooterProps } from './types'
import './styles.scss'

export const Footer: FC<IFooterProps> = () => {
	return (
		<footer className='footer'>
			<Container className='footer_container'>
				<div className='footer_content'>
					<div className='footer_content_item'>
						<Divider />
						<div className='footer_logo_wrapper'>
							<div className='footer_logo_text'>AlemAgro</div>
						</div>
						<ul className='footer_ul'>
							<li>Страницы:</li>
							<li>
								<NavLink to={ROUTE_TO_HOME()}>Главная</NavLink>
							</li>
							<li>
								<NavLink to={ROUTE_TO_MAP()}>Карта</NavLink>
							</li>
						</ul>
					</div>
				</div>
			</Container>
		</footer>
	)
}
