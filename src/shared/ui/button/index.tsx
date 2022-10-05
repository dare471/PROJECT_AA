import { FC, PropsWithChildren } from 'react'
import { IButtonProps } from './types'
import './styles.scss'

export const Button: FC<PropsWithChildren<IButtonProps>> = ({ className, children, ...props }) => {
	return (
		<button className={className ? `button ${className}` : 'button'} {...props}>
			{children}
		</button>
	)
}
