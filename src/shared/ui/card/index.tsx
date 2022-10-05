import { FC, PropsWithChildren } from 'react'
import { ICardProps } from './types'
import './styles.scss'

export const Card: FC<PropsWithChildren<ICardProps>> = ({ className, children, ...props }) => {
	return (
		<div className={`card${className ? ' ' + className : ''}`} {...props}>
			{children}
		</div>
	)
}
