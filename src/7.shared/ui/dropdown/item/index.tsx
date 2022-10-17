import { FC, PropsWithChildren } from 'react'
import { IDropDownItemProps } from './types'
import './styles.scss'

export const DropDownItem: FC<PropsWithChildren<IDropDownItemProps>> = ({
	leftIcon,
	rightIcon,
	onClick,
	className,
	children
}) => {
	return (
		// eslint-disable-next-line jsx-a11y/anchor-is-valid
		<a href='#' className={`dropdown_item${className ? ' ' + className : ''}`} onClick={onClick}>
			{leftIcon && <span className='dropdown_item_icon left'>{leftIcon}</span>}
			{children}
			{rightIcon && <span className='dropdown_item_icon right'>{rightIcon}</span>}
		</a>
	)
}
