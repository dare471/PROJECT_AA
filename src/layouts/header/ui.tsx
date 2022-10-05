import { FC, PropsWithChildren } from 'react'
import { Container } from '@/shared/ui'
import { IHeaderLayoutProps } from './types'
import './styles.scss'

export const HeaderLayout: FC<PropsWithChildren<IHeaderLayoutProps>> = ({ children }) => {
	return (
		<header className='header'>
			<Container>
				<nav className='header_nav'>{children}</nav>
			</Container>
		</header>
	)
}
