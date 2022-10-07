import { FC, PropsWithChildren } from 'react'
import { ISectionProps } from './types'
import './styles.scss'

export const Section: FC<PropsWithChildren<ISectionProps>> = ({ className, children, ...props }) => {
	return (
		<section className={`section${className ? ' ' + className : ''}`} {...props}>
			{children}
		</section>
	)
}
