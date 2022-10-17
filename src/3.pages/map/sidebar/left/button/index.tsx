import { FC } from 'react'
import { Button } from '@/7.shared/ui'
import { ILeftSidebarResetButtonProps } from './types'
import './styles.scss'

export const LeftSidebarResetButton: FC<ILeftSidebarResetButtonProps> = ({ onClick }) => {
	return (
		<div>
			<Button className='map_reset_button' boxShadow={false} onClick={onClick}>
				Вернуться к последнему
			</Button>
		</div>
	)
}
