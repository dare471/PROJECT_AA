import { FC, PropsWithChildren } from 'react'
import { Container } from '@/7.shared/ui'
import { IHeaderTemplateProps } from './types'
import './styles.scss'

export const HeaderTemplate: FC<PropsWithChildren<IHeaderTemplateProps>> = ({ children }) => {
	return (
		<header className='header'>
			<Container>
				<nav className='header_nav'>{children}</nav>
			</Container>
		</header>
	)
}
