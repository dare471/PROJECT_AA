import { FC } from 'react'
import { Polygon } from 'react-leaflet'
import { useSearchParams } from 'react-router-dom'
import { illustrateChecker } from '@/features/map/lib'
import { polygonNormalizer } from '@/shared/api/polygon'
import { IMapPolygonsProps } from './types'

export const MapPolygons: FC<IMapPolygonsProps> = ({ polygons, illustratePolygons, activePolygon }) => {
	const [searchParams, setSearchParams] = useSearchParams()
	const illustrate = illustrateChecker(illustratePolygons, 'nothing')

	return (
		<>
			{polygons
				.filter(item =>
					activePolygon
						? activePolygon.properties?.TYPE_1
							? activePolygon.properties.GID_1 !== item.properties.GID_1
							: activePolygon.properties.GID_2 !== item.properties.GID_2
						: true
				)
				.map((polygon, index) => (
					<Polygon
						key={`${index}-${polygon}`}
						positions={polygonNormalizer(polygon)}
						eventHandlers={{
							click() {
								if (illustrate === 'district') {
									searchParams.set(illustrate, polygon.properties.GID_2)
									setSearchParams(searchParams)
								}
							}
						}}
					></Polygon>
				))}
		</>
	)
}
