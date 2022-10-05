import { FC, PropsWithChildren } from 'react'
import { ILabelProps } from './types'
import './styles.scss'

export const Label: FC<PropsWithChildren<ILabelProps>> = ({ id, className, title, children, ...props }) => {
	return (
		<label htmlFor={id} className={className ? `label ${className}` : 'label'} {...props}>
			{title}
		</label>
	)
}
