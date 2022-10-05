import { FC } from 'react'
import { Polygon } from 'react-leaflet'
import { polygonNormalizer } from '@/shared/api/polygon'
import { IMapPolygonsProps } from './types'

export const MapPolygons: FC<IMapPolygonsProps> = ({ polygons, handleChangeCurrentPolygon, color }) => {
	return (
		<>
			{polygons.map((polygon: any, index: any) => (
				<div style={{ inlineSize: '100%', blockSize: '100%' }} key={`${polygon}-${index}`}>
					{polygon.GEOMETRY_RINGS && (
						<Polygon
							positions={polygonNormalizer(polygon)}
							pathOptions={{ color }}
							eventHandlers={{
								click() {
									const type = polygon.type
									const id = polygon.KATO || polygon.CLIENT_INFO_ID

									if (type && id) {
										handleChangeCurrentPolygon(
											type,
											id,
											type === 'region' || type === 'district' ? ['request', 'map'] : ['request']
										)
									}
								}
							}}
						></Polygon>
					)}
				</div>
			))}
		</>
	)
}
