import { HTMLProps, ReactNode } from 'react'

import './styles.scss'

type TNavbarProps = {
	children: ReactNode
} & HTMLProps<HTMLElement>

export const Navbar = ({ className, children, ...otherProps }: TNavbarProps) => (
	<nav className={`navbar${className ? ' ' + className : ''}`} {...otherProps}>
		{children}
	</nav>
)
