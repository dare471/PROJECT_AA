import { HTMLProps, MouseEvent } from 'react'

import { typedHandleKeyUp } from '@/7.shared/lib/browser'

import './styles.scss'

export type TAvatarProps = {
	src: string
	role?: string
	onClick?: (event: MouseEvent<HTMLElement>) => void
}

export type TAvatarAllProps = TAvatarProps & HTMLProps<HTMLSpanElement>

export const Avatar = (props: TAvatarAllProps) => {
	const { className, src, role = 'menuitem', onClick, ...otherProps } = props

	const handleClick = () => {
		console.log('click')
	}

	return (
		<span
			className={`avatar${className ? ' ' + className : ''}`}
			role={role}
			onClick={onClick}
			onKeyUp={event => typedHandleKeyUp(event, onClick ? onClick : handleClick)}
			{...otherProps}
		>
			<img src={src} alt='avatar' />
		</span>
	)
}
