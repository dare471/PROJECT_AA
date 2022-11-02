import { forwardRef, HTMLProps, Ref } from 'react'

import './styles.scss'

export type TErrorSubMessageProps<T> = {
	error: T | string
	trait?: string
	name?: string
}

export type TErrorSubMessageAllProps<T> = TErrorSubMessageProps<T> & HTMLProps<HTMLDivElement>

export const _ErrorSubMessage = <T extends object, K extends keyof T & object, N extends keyof K>(
	{ error, trait, name, className, ...otherProps }: TErrorSubMessageAllProps<T>,
	ref: Ref<HTMLDivElement>
) => (
	<>
		{typeof error === 'object' ? (
			<>
				{error && error[trait as K] && error[trait as K][name as N] && (
					<div className={`error_message${className ? ' ' + className : ''}`} ref={ref} {...otherProps}>
						<p>{error[trait as K][name as N]}</p>
					</div>
				)}
			</>
		) : (
			<div className={`error_message${className ? ' ' + className : ''}`} ref={ref} {...otherProps}>
				<p>{error}</p>
			</div>
		)}
	</>
)

export const ErrorSubMessage = forwardRef(_ErrorSubMessage)
