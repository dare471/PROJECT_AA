import { FC } from 'react'
import { IAvatarProps } from './types'
import './styles.scss'

export const Avatar: FC<IAvatarProps> = ({ className, src, role = 'menuitem', onClick }) => {
	const onKeyUp = (e: any) => {
		if (e.key === 'Enter') {
			onClick()
		}
	}

	return (
		<span className={`avatar${className ? ' ' + className : ''}`} role={role} onClick={onClick} onKeyUp={onKeyUp}>
			<img src={src} alt='avatar' />
		</span>
	)
}
