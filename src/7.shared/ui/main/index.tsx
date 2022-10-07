import { FC, PropsWithChildren } from 'react'
import { IMain } from './types'
import './styles.scss'

export const Main: FC<PropsWithChildren<IMain>> = ({ className, children, ...props }) => {
	return (
		<main className={`main${className ? ' ' + className : ''}`} {...props}>
			{children}
		</main>
	)
}
