import { CSSProperties, memo } from 'react'

import { TClientPolygon } from '@/7.shared/api'
import { typedHandleKeyUp } from '@/7.shared/lib/browser'
import { Card, Divider } from '@/7.shared/ui'

import './styles.scss'

type TClientPolygonDetailsProps = {
	data: TClientPolygon
	index: number
	style: CSSProperties
	handleClickComment: (...params: any) => void
	handleClickView: (...params: any) => void
	clientPolygonQP: number
}

export const ClientPolygonDetails = memo((props: TClientPolygonDetailsProps) => {
	const { data, index, style, handleClickComment, handleClickView, clientPolygonQP } = props

	//FIXME: remove redundancy
	return (
		<Card
			className={`client_details_card${clientPolygonQP === Number(data.id) ? ' active' : ''}`}
			style={{ ...style, top: parseFloat(`${style?.top}`) + 10, height: parseFloat(`${style?.height}`) - 10 }}
		>
			<div className='client_details_item first'>
				<span>{index + 1}</span>
			</div>

			<div className='client_details_item second'>
				<div className='client_details_item_data first'>
					<h5 className='title'>Тип:</h5>
					<span className='data'>{data.type_area}</span>
				</div>
				<div className='client_details_item_data second'>
					<h5 className='title'>Като:</h5>
					<span className='data'>{data.cato}</span>
				</div>
				<div className='client_details_item_data third'>
					<h5 className='title'>Кадастр:</h5>
					<span className='data'>{data.kadastr}</span>
				</div>
				<div className='client_details_item_data fourth'>
					<h5 className='title'>Площадь:</h5>
					<span className='data'>{data.area}</span>
				</div>
				<Divider />
				<div className='client_details_item_data fifth'>
					<span
						className='data'
						role='button'
						tabIndex={0}
						onClick={() => handleClickView(data)}
						onKeyUp={event => typedHandleKeyUp(event, handleClickView, data)}
					>
						Посмотреть
					</span>
					<span
						className='data'
						role='button'
						tabIndex={0}
						onClick={() => handleClickComment(data, index)}
						onKeyUp={event => typedHandleKeyUp(event, handleClickComment, data, index)}
					>
						Комментарий
					</span>
				</div>
			</div>
		</Card>
	)
})
