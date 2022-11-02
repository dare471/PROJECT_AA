import { HTMLProps, ReactNode } from 'react'

import './styles.scss'

type TContainerProps = {
	children: ReactNode
} & HTMLProps<HTMLDivElement>

export const Container = ({ className, children, ...otherProps }: TContainerProps) => (
	<div className={`container${className ? ' ' + className : ''}`} {...otherProps}>
		{children}
	</div>
)
