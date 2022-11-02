import { HTMLProps, ReactNode } from 'react'

import { Container, Navbar } from '@/7.shared/ui'

import './styles.scss'

type THeaderTemplateProps = {
	children: ReactNode
	classNameNav?: string
} & HTMLProps<HTMLElement>

export const HeaderTemplate = ({ children, className, classNameNav }: THeaderTemplateProps) => (
	<header className={`header${className ? ' ' + className : ''}`}>
		<Container>
			<Navbar className={`header_navbar${classNameNav ? ' ' + classNameNav : ''}`}>{children}</Navbar>
		</Container>
	</header>
)
