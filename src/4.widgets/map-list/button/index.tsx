import { Button } from '@/7.shared/ui'

import './styles.scss'

type TLeftSidebarResetButtonProps = {
	onClick: any
}

export const LeftSidebarResetButton = (props: TLeftSidebarResetButtonProps) => {
	const { onClick } = props

	return (
		<div>
			<Button className='map_reset_button' boxShadow={false} onClick={onClick}>
				Вернуться к последнему
			</Button>
		</div>
	)
}
