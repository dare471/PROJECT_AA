import { HTMLProps } from 'react'

import './styles.scss'

type TArticleProps = HTMLProps<HTMLElement>

export const Article = ({ className, children, ...otherProps }: TArticleProps) => (
	<article className={`article${className ? ' ' + className : ''}`} {...otherProps}>
		{children}
	</article>
)
