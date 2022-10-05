import { FC, PropsWithChildren, forwardRef } from 'react'
import { IArticleProps } from './types'
import './styles.scss'

export const Article: FC<PropsWithChildren<IArticleProps>> = forwardRef<any, any>(
	({ className, children, ...props }, ref) => {
		return (
			<article className={className ? `article ${className}` : 'article'} ref={ref} {...props}>
				{children}
			</article>
		)
	}
)
