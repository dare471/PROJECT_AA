import { forwardRef, HTMLProps, ReactNode, Ref } from 'react'

import './styles.scss'

export type TDropDownItemProps = {
	children: ReactNode
	leftIcon?: ReactNode
	rightIcon?: ReactNode
}

export type TDropDownItemAllProps = TDropDownItemProps & HTMLProps<HTMLAnchorElement>

export const DropDownItem = forwardRef(
	({ leftIcon, rightIcon, className, children, ...otherProps }: TDropDownItemAllProps, ref: Ref<HTMLAnchorElement>) => (
		// eslint-disable-next-line jsx-a11y/anchor-is-valid
		<a href='#' className={`dropdown_item${className ? ' ' + className : ''}`} ref={ref} {...otherProps}>
			{leftIcon && <span className='dropdown_item_icon left'>{leftIcon}</span>}
			{children}
			{rightIcon && <span className='dropdown_item_icon right'>{rightIcon}</span>}
		</a>
	)
)
