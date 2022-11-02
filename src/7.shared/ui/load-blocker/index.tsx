import { HTMLProps } from 'react'

import { Load } from '@/7.shared/ui'

import './styles.scss'

type TLoadBlockerProps = HTMLProps<HTMLDivElement>

export const LoadBlocker = ({ className, ...otherProps }: TLoadBlockerProps) => (
	<div className={`load_blocker${className ? ' ' + className : ''}`} {...otherProps}>
		<Load />
	</div>
)
