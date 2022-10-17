import { FC } from 'react'
import { Button } from '@/7.shared/ui'
import { ICollapseButtonProps } from './types'
import './styles.scss'

export const CollapseButton: FC<ICollapseButtonProps> = ({ data, isExpanded, getToggleProps, handleClickExpand }) => {
	return (
		<header className={`map_collapse_header${isExpanded ? ' active' : ''}`}>
			<h6 className='map_collapse_header_title'>{data.NAME || data.TEXT}</h6>

			{getToggleProps ? (
				<Button
					{...getToggleProps({ onClick: handleClickExpand })}
					boxShadow={false}
					className={`map_collapse_header_button ${isExpanded ? 'open' : 'close'}`}
				></Button>
			) : (
				<Button
					onClick={handleClickExpand}
					boxShadow={false}
					className={`map_collapse_header_button view${isExpanded ? ' active' : ''}`}
				></Button>
			)}
		</header>
	)
}
