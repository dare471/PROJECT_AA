import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { routes } from '@/7.shared/config'
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
								<NavLink to={routes.home({})}>Главная</NavLink>
							</li>
							<li>
								<NavLink to={routes.map({})}>Карта</NavLink>
							</li>
						</ul>
					</div>
				</div>
			</Container>
		</footer>
	)
}
