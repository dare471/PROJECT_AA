import { FC, forwardRef } from 'react'
import { IInputProps } from './types'
import './styles.scss'

export const Input: FC<IInputProps> = forwardRef<any, any>(({ className, boxShadow = true, ...props }, ref) => {
	return (
		<input
			className={`input ${className ? ' ' + className : ''}${boxShadow ? ' box-shadow' : ''}`}
			ref={ref}
			{...props}
		/>
	)
})
