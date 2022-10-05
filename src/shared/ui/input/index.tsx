import { FC, forwardRef } from 'react'
import { IInputProps } from './types'
import './styles.scss'

export const Input: FC<IInputProps> = forwardRef<any, any>(({ className, ...props }, ref) => {
	return <input className={className ? `input ${className}` : 'input'} ref={ref} {...props} />
})
