import { FC, PropsWithChildren, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { INavbarItemProps } from './types'
import './styles.scss'

export const NavbarItem: FC<PropsWithChildren<INavbarItemProps>> = ({
	className,
	classNameLink,
	content,
	to,
	children
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	return (
		<li className={`navbar_item${className ? ' ' + className : ''}`}>
			{to ? (
				<NavLink to={to} className={classNameLink}>
					{content}
				</NavLink>
			) : (
				<span
					className='navbar_item_content'
					role='button'
					tabIndex={0}
					onKeyUp={() => console.log('')}
					onClick={() => setIsOpen(prev => !prev)}
				>
					{content}
				</span>
			)}
			{isOpen && children}
		</li>
	)
}
