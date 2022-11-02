import { HTMLProps } from 'react'

import './styles.scss'

type TInputProps = {
	boxShadow?: boolean
} & HTMLProps<HTMLInputElement>

export const Input = ({ className, boxShadow = true, ...otherProps }: TInputProps) => (
	<input className={`input ${className ? ' ' + className : ''}${boxShadow ? ' box-shadow' : ''}`} {...otherProps} />
)
