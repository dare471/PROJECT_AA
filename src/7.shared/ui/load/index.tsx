import { HTMLProps } from 'react'

import './styles.scss'

type TLoadProps = {
	strokeWidth?: number
} & HTMLProps<HTMLDivElement>

export const Load = ({ className, width = 30, height = 30, strokeWidth = 3, ...otherProps }: TLoadProps) => (
	<div className={`load${className ? ' ' + className : ''}`} {...otherProps}>
		<div className='spinner_wrapper'>
			<svg
				className='spinner'
				viewBox='0 0 50 50'
				style={{
					width,
					height
				}}
			>
				<circle className='path' cx='25' cy='25' r='20' fill='none' strokeWidth={strokeWidth}></circle>
			</svg>
		</div>
	</div>
)
