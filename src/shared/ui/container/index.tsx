import { FC, PropsWithChildren } from 'react'
import { IContainerProps } from './types'
import './styles.scss'

export const Container: FC<PropsWithChildren<IContainerProps>> = ({
	className,
	children,
	...props
}) => {
	return (
		<div
			className={className ? `container ${className}` : 'container'}
			{...props}
		>
			{children}
		</div>
	)
}
