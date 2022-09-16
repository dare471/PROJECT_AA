import { FC, PropsWithChildren } from 'react'
import './styles.scss'
import { IButtonProps } from './types'

export const Button: FC<PropsWithChildren<IButtonProps>> = ({
	className,
	children,
	...props
}) => {
	return (
		<button className={className ? `button ${className}` : 'button'} {...props}>
			{children}
		</button>
	)
}
