import { FC, memo } from 'react'
import { Polygon } from 'react-leaflet'
import { IMapPolygonsProps } from './types'

export const MapPolygons: FC<IMapPolygonsProps> = memo(({ polygons, color, onClick }) => {
	return (
		<>
			{polygons.map((polygon: any, index: any) => (
				<div style={{ inlineSize: '100%', blockSize: '100%' }} key={`${polygon}-${index}`}>
					{polygon.GEOMETRY_RINGS && (
						<Polygon
							positions={polygon.GEOMETRY_RINGS}
							pathOptions={{ color: color instanceof Function ? color(polygon) : color }}
							eventHandlers={{
								click() {
									onClick(polygon)
								}
							}}
						></Polygon>
					)}
				</div>
			))}
		</>
	)
})
