import { useQueryParam } from 'use-query-params'

import { TPolygonType } from '@/7.shared/api'
import { typedHandleKeyUp } from '@/7.shared/lib/browser'
import { TSetState } from '@/7.shared/lib/react'
import { Button } from '@/7.shared/ui'

import './styles.scss'

type TMapSidebarHeaderProps = {
	setIllustrate: TSetState<TPolygonType | undefined>
}

export const MapSidebarHeader = (props: TMapSidebarHeaderProps) => {
	const { setIllustrate } = props

	const [illustrateQP] = useQueryParam<TPolygonType>('illustrate')
	const [regionQP, setRegionQP] = useQueryParam('region')
	const [districtQP, setDistrictQP] = useQueryParam('district')
	const [clientPolygonsQP, setClientPolygonsQP] = useQueryParam('clientPolygons')
	const [clientPolygonQP, setClientPolygonQP] = useQueryParam('clientPolygon')

	const handleClick = (type: TPolygonType) => {
		if (
			(type === 'region' && !regionQP) ||
			(type === 'district' && !districtQP) ||
			(type === 'clientPolygons' && !clientPolygonsQP) ||
			(type === 'clientPolygon' && clientPolygonQP)
		)
			return
		setIllustrate(type)
	}

	return (
		<header className='map_sidebar_header'>
			<div className='map_sidebar_header_item'>
				<Button
					className='map_sidebar_header_button prev'
					disabled={illustrateQP === 'country'}
					boxShadow={false}
					onClick={() =>
						handleClick(
							illustrateQP === 'region'
								? 'country'
								: illustrateQP === 'district'
								? 'region'
								: illustrateQP === 'clientPolygons'
								? 'district'
								: illustrateQP === 'clientPolygon'
								? 'clientPolygons'
								: 'country'
						)
					}
					onKeyUp={event =>
						typedHandleKeyUp(
							event,
							handleClick,
							illustrateQP === 'region'
								? 'country'
								: illustrateQP === 'district'
								? 'region'
								: illustrateQP === 'clientPolygons'
								? 'district'
								: illustrateQP === 'clientPolygon'
								? 'clientPolygons'
								: 'country'
						)
					}
				>
					Назад к{' '}
					{illustrateQP === 'region'
						? 'Стране'
						: illustrateQP === 'district'
						? 'Области'
						: illustrateQP === 'clientPolygons'
						? 'Району'
						: illustrateQP === 'clientPolygon'
						? 'Клиенту'
						: 'Стране'}
				</Button>

				<Button
					className='map_sidebar_header_button next'
					disabled={illustrateQP === 'clientPolygon'}
					boxShadow={false}
					onClick={() =>
						handleClick(
							illustrateQP === 'country'
								? 'region'
								: illustrateQP === 'region'
								? 'district'
								: illustrateQP === 'district'
								? 'clientPolygons'
								: illustrateQP === 'clientPolygons'
								? 'clientPolygon'
								: 'clientPolygon'
						)
					}
					onKeyUp={event =>
						typedHandleKeyUp(
							event,
							handleClick,
							illustrateQP === 'country'
								? 'region'
								: illustrateQP === 'region'
								? 'district'
								: illustrateQP === 'district'
								? 'clientPolygons'
								: illustrateQP === 'clientPolygons'
								? 'clientPolygon'
								: 'clientPolygon'
						)
					}
				>
					Вперед к{' '}
					{illustrateQP === 'country'
						? 'Области'
						: illustrateQP === 'region'
						? 'Району'
						: illustrateQP === 'district'
						? 'Клиенту'
						: illustrateQP === 'clientPolygons'
						? 'Полигону'
						: 'Полигону'}
				</Button>
			</div>
		</header>
	)
}
