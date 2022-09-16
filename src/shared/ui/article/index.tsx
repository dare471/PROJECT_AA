import { FC, PropsWithChildren } from 'react'
import { IArticleProps } from './types'
import './styles.scss'

export const Article: FC<PropsWithChildren<IArticleProps>> = ({
	className,
	children,
	...props
}) => {
	return (
		<article
			className={className ? `article ${className}` : 'article'}
			{...props}
		>
			{children}
		</article>
	)
}
