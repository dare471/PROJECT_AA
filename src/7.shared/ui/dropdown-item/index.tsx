import { FC } from 'react'
import { IDropDownItemProps } from './types'
import './styles.scss'

export const DropDownItem: FC<IDropDownItemProps> = ({ className, icon, title, onClick }) => {
	const onKeyUp = (e: any) => {
		if (e.key === 'Enter') {
			onClick()
		}
	}

	return (
		<li className='dropdown_item_wrapper'>
			<div
				className={`dropdown_item${className ? ' ' + className : ''}`}
				role='button'
				tabIndex={0}
				onClick={onClick}
				onKeyUp={onKeyUp}
			>
				{icon && <div className='icon'>{icon}</div>}
				<div className='title'>{title}</div>
			</div>
		</li>
	)
}
