import { HTMLProps, ReactNode } from 'react'

import './styles.scss'

type TCardProps = {
	children: ReactNode | string
	boxShadow?: boolean
} & HTMLProps<HTMLDivElement>

export const Card = (props: TCardProps) => {
	const { className, boxShadow = true, children, ...otherProps } = props

	return (
		<div className={`card${className ? ' ' + className : ''}${boxShadow ? ' box-shadow' : ''}`} {...otherProps}>
			{children}
		</div>
	)
}
