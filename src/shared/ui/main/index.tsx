import { FC, PropsWithChildren } from 'react'
import { IMain } from './types'

export const Main: FC<PropsWithChildren<IMain>> = ({ className, children, ...props }) => {
	return (
		<main className={className ? `main ${className}` : 'main'} {...props}>
			{children}
		</main>
	)
}
