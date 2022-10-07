import { FC, PropsWithChildren } from 'react'
import { IContainerProps } from './types'
import './styles.scss'

export const Container: FC<PropsWithChildren<IContainerProps>> = ({ className, children, ...props }) => {
	return (
		<div className={`container${className ? ' ' + className : ''}`} {...props}>
			{children}
		</div>
	)
}
