import { FC, PropsWithChildren } from 'react'
import { ISectionProps } from './types'
import './styles.scss'

export const Section: FC<PropsWithChildren<ISectionProps>> = ({
	className,
	children,
	...props
}) => {
	return (
		<section
			className={className ? `section ${className}` : 'section'}
			{...props}
		>
			{children}
		</section>
	)
}
