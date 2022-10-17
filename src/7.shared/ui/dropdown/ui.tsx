import { FC, PropsWithChildren } from 'react'
import { IDropDownProps } from './types'
import './styles.scss'

export const DropDown: FC<PropsWithChildren<IDropDownProps>> = ({ className, children }) => {
	return <div className={`dropdown${className ? ' ' + className : ''}`}>{children}</div>
}
