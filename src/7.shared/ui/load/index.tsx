import { FC } from 'react'
import { ILoadProps } from './types'
import './styles.scss'

export const Load: FC<ILoadProps> = ({ className, width = 30, height = 30, strokeWidth = 3, ...props }) => {
	return (
		<div className={`load${className ? ' ' + className : ''}`} {...props}>
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
}
