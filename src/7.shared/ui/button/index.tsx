import { FC, PropsWithChildren } from 'react'
import { IButtonProps } from './types'
import './styles.scss'

export const Button: FC<PropsWithChildren<IButtonProps>> = ({ className, boxShadow = true, children, ...props }) => {
	return (
		<button className={`button${className ? ' ' + className : ''}${boxShadow ? ' box-shadow' : ''}`} {...props}>
			{children}
		</button>
	)
}
