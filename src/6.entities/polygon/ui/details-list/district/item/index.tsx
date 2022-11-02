import { CSSProperties, memo } from 'react'

import { TDistrictPolygon } from '@/7.shared/api'
import { typedHandleKeyUp } from '@/7.shared/lib/browser'
import { Button, Card } from '@/7.shared/ui'

import './styles.scss'

type TDistrictPolygonDetailsProps = {
	data: TDistrictPolygon
	index: number
	style: CSSProperties
	handleClickView: any
}

export const DistrictPolygonDetails = memo((props: TDistrictPolygonDetailsProps) => {
	const { data, index, style, handleClickView } = props

	//FIXME: remove redundancy
	return (
		<Card
			className='district_details_card'
			style={{
				...style,
				top: parseFloat(`${style.top}`) + 5,
				height: parseFloat(`${style.height}`) - 15,
				width: `calc(${style.width} - 1rem)`
			}}
		>
			<section className='district_details_section'>
				<div className='district_details_item first'>
					<h5 className='district_details_name'>{data.name}</h5>
					<p className={`district_details_info${data.cato ? ' our' : ' not-our'}`}>
						{data.cato ? 'Наш Клиент' : 'Не наш клиент'}
					</p>
				</div>
				<div className='district_details_item second'>
					<Button
						className='district_details_button'
						onClick={() => handleClickView(data)}
						onKeyUp={event => typedHandleKeyUp(event, handleClickView, data)}
						boxShadow={false}
					>
						Посмотреть
					</Button>
				</div>
			</section>
		</Card>
	)
})
