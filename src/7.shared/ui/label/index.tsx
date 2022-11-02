import { HTMLProps } from 'react'

import './styles.scss'

type TLabelProps = HTMLProps<HTMLLabelElement>

export const Label = ({ id, className, title, ...otherProps }: TLabelProps) => (
	<label htmlFor={id} className={`label${className ? ' ' + className : ''}`} {...otherProps}>
		{title}
	</label>
)
