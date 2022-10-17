import { FC, memo } from 'react'
import { IMapPolygonsProps } from './types'
import { PolygonItem } from './polygon-item'

export const MapPolygons: FC<IMapPolygonsProps> = memo(({ polygons, color, onClick }) => {
	return (
		<>
			{polygons.map((polygon: any, index: any) => (
				<PolygonItem key={`${polygon}-${index}`} polygon={polygon} color={color} onClick={onClick} />
			))}
		</>
	)
})
