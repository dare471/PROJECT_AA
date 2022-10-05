import { FC } from 'react'
import { IErrorMessageProps } from './types'
import './styles.scss'

export const ErrorMessage: FC<IErrorMessageProps> = ({ className, errors, name, prop }) => {
	return (
		<>
			{errors && errors[name] && errors[name][prop] && (
				<div className={`error_message${className ? ' ' + className : ''}`}>
					<p>{errors[name][prop]}</p>
				</div>
			)}
		</>
	)
}
