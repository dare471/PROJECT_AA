import { FC } from 'react'
import './styles.scss'
import { IInputProps } from './types'

export const Input: FC<IInputProps> = ({ className, ...props }) => {
	return (
		<input className={className ? `input ${className}` : 'input'} {...props} />
	)
}
