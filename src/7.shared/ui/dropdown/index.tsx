import { FC, PropsWithChildren } from 'react'
import './styles.scss'

export const DropDown: FC<PropsWithChildren> = ({ children }) => {
	return <ul className='dropdown'>{children}</ul>
}
