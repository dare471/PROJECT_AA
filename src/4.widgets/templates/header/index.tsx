import { FC, PropsWithChildren } from 'react'
import { Container, Navbar } from '@/7.shared/ui'
import { IHeaderTemplateProps } from './types'
import './styles.scss'

export const HeaderTemplate: FC<PropsWithChildren<IHeaderTemplateProps>> = ({ children }) => {
	return (
		<header className='header'>
			<Container>
				<Navbar className='header_navbar'>{children}</Navbar>
			</Container>
		</header>
	)
}
