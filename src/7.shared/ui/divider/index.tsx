import { HTMLProps } from 'react'

import './styles.scss'

type TDividerProps = HTMLProps<HTMLDivElement>

export const Divider = ({ className, ...otherProps }: TDividerProps) => (
	<div className={`divider${className ? ' ' + className : ''}`} {...otherProps} />
)
