import { Button, Card } from '@/7.shared/ui'

import { GetTogglePropsInput, GetTogglePropsOutput } from 'react-collapsed/dist/types'

import { TListIllustrate } from '../..'
import './styles.scss'

type TCollapseButtonProps = {
	label: string
	isExpanded: boolean
	onClick: any
	type: TListIllustrate
	getToggleProps: (config?: GetTogglePropsInput | undefined) => GetTogglePropsOutput
}

export const CollapseButton = (props: TCollapseButtonProps) => {
	const { label, isExpanded, getToggleProps, onClick, type } = props

	return (
		<Card className='map_collapse_card'>
			<section className={`map_collapse_section${isExpanded ? ' active' : ''}`}>
				<h6 className={`map_collapse_card_title${isExpanded ? ' active' : ''}`}>{label}</h6>

				{type === 'region' && (
					<Button
						{...getToggleProps({ onClick: onClick })}
						boxShadow={false}
						className={`map_collapse_card_button${isExpanded ? ' open' : ' close'}`}
					></Button>
				)}
				{type === 'district' && (
					<Button
						onClick={onClick}
						boxShadow={false}
						className={`map_collapse_card_button view${isExpanded ? ' active' : ''}`}
					></Button>
				)}
			</section>
		</Card>
	)
}
