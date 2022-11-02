import { forwardRef, HTMLProps, ReactNode, Ref } from 'react'

import './styles.scss'

type TDropDownProps = {
	children: ReactNode
} & HTMLProps<HTMLDivElement>

export const DropDown = forwardRef(
	({ className, children, ...otherProps }: TDropDownProps, ref: Ref<HTMLDivElement>) => (
		<div className={`dropdown${className ? ' ' + className : ''}`} ref={ref} {...otherProps}>
			{children}
		</div>
	)
)
