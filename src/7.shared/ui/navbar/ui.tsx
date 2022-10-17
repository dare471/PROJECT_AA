import { FC, PropsWithChildren } from 'react'
import { INavbarProps } from './types'
import './styles.scss'

export const Navbar: FC<PropsWithChildren<INavbarProps>> = ({ className, children }) => {
	return <nav className={`navbar${className ? ' ' + className : ''}`}>{children}</nav>
}
