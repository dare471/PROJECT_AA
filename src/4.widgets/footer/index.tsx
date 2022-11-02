import { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

import { routes } from '@/7.shared/config'
import { Container, Divider, Navbar, NavbarItem, ProjectLogo } from '@/7.shared/ui'

import './styles.scss'

export const Footer = () => {
	//FIXME: remove redundancy
	return (
		<footer className='footer'>
			<Container className='footer_container'>
				<div className='footer_content'>
					<FooterContentItem>
						<Divider />
						<ProjectLogo className='footer_logo_wrapper' classNameImage='footer_logo_image' alt='Footer Project Logo' />
						<Navbar className='footer_nav'>
							<NavbarItem className='footer_nav_item' content='Главная' to={routes.home()} />
							<NavbarItem className='footer_nav_item' content='Карта' to={routes.map()} />
						</Navbar>
					</FooterContentItem>
				</div>
			</Container>
		</footer>
	)
}

type TFooterContentItemProps = {
	children: ReactNode
}
const FooterContentItem = ({ children }: TFooterContentItemProps) => (
	<div className='footer_content_item'>{children}</div>
)
