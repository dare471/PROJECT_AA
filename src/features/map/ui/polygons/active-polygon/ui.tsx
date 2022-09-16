import { FC, useEffect } from 'react'
import { Polygon } from 'react-leaflet'
import { useSearchParams } from 'react-router-dom'
import { illustrateChecker } from '@/features/map/lib/illustrate-checker'
import { polygonNormalizer } from '@/shared/api'
import { IMapActivePolygonProps } from './types'
import './styles.scss'

export const MapActivePolygon: FC<IMapActivePolygonProps> = ({
	activePolygon,
	setActivePolygon,
	polygons,
	illustratePolygons
}) => {
	const [searchParams] = useSearchParams()
	const illustrate = illustrateChecker(illustratePolygons, 'nothing')
	const illustrateValue = searchParams.get(illustrate)

	useEffect(() => {
		if (searchParams.has(illustrate) && polygons) {
			const activeIndex = polygons.findIndex(
				item => item.properties.GID_2 === illustrateValue
			)
			if (activeIndex !== -1) {
				setActivePolygon(prev =>
					!prev ||
					(polygons[activeIndex].properties?.TYPE_1
						? activePolygon?.properties.GID_1 !==
						  polygons[activeIndex].properties.GID_1
						: activePolygon?.properties.GID_2 !==
						  polygons[activeIndex].properties.GID_2)
						? { ...polygons[activeIndex] }
						: prev
				)
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [illustratePolygons, illustrateValue, polygons])

	return (
		<>
			{activePolygon && (
				<Polygon
					positions={polygonNormalizer(activePolygon)}
					pathOptions={{ color: 'black' }}
				></Polygon>
			)}
		</>
	)
}
