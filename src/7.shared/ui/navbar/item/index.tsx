import { HTMLProps, MouseEvent, ReactNode, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { typedHandleKeyUp } from '@/7.shared/lib/browser'

import './styles.scss'

export type TNavbarItemProps = {
	children?: ReactNode
	classNameLink?: (({ isActive }: { isActive: boolean }) => string) | string
	content: ReactNode
	to?: string
}

export type TNavbarItemAllProps = TNavbarItemProps & Omit<HTMLProps<HTMLLIElement>, 'content'>

export const NavbarItem = (props: TNavbarItemAllProps) => {
	const { className, classNameLink, content, to, children, ...otherProps } = props

	const [isOpen, setIsOpen] = useState<boolean>(false)

	const handleClick = (event: MouseEvent<HTMLElement>) => {
		setIsOpen(prev => !prev)
	}

	return (
		<li className={`navbar_item${className ? ' ' + className : ''}`} {...otherProps}>
			{to ? (
				<NavLink to={to} className={classNameLink || ''}>
					{content}
				</NavLink>
			) : (
				<span
					className='navbar_item_content'
					role='button'
					tabIndex={0}
					onKeyUp={event => typedHandleKeyUp(event, handleClick)}
					onClick={handleClick}
				>
					{content}
				</span>
			)}
			{isOpen && children}
		</li>
	)
}
