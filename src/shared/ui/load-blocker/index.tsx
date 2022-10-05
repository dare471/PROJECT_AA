import { FC } from 'react'
import { Load } from '@/shared/ui'
import { ILoadBlockerProps } from './types'
import './styles.scss'

export const LoadBlocker: FC<ILoadBlockerProps> = ({ className, ...props }) => {
	return (
		<div className={`load_blocker${className ? ' ' + className : ''}`} {...props}>
			<Load />
		</div>
	)
}
