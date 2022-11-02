import { ButtonHTMLAttributes, ReactNode } from 'react'

import './styles.scss'

type TButtonProps = {
	children?: ReactNode | string
	boxShadow?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({ className, boxShadow = true, children, ...otherProps }: TButtonProps) => (
	<button className={`button${className ? ' ' + className : ''}${boxShadow ? ' box-shadow' : ''}`} {...otherProps}>
		{children}
	</button>
)
