import { memo } from 'react'

import { TPolygon } from '@/7.shared/api'

import { MapPolygon } from './item'

type TMapPolygonsProps = {
	polygons: TPolygon[] | null
	color: ((polygon: any) => string) | string
	onClick?: (polygon: TPolygon, illustrateDataQP: any, setIllustrateDataQP: any) => void
}

export const MapPolygons = memo((props: TMapPolygonsProps) => {
	const { polygons, color, onClick } = props

	return (
		<>
			{polygons && (
				<>
					{polygons.map((polygon: any, index: any) => (
						<MapPolygon key={`${polygon}-${index}`} polygon={polygon} color={color} onClick={onClick} />
					))}
				</>
			)}
		</>
	)
})
