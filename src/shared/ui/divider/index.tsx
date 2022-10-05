import { FC } from 'react'
import { IDividerProps } from './types'
import './styles.scss'

export const Divider: FC<IDividerProps> = ({ className, ...props }) => {
	return <div className={`divider${className ? ' ' + className : ''}`} {...props}></div>
}
