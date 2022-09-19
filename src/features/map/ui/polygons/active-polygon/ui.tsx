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
			const activeIndex = polygons.data.findIndex(item => item.properties.ID === illustrateValue)
			if (activeIndex !== -1) {
				setActivePolygon(prev =>
					!prev ||
					(polygons.data[activeIndex].properties?.TYPE_1
						? activePolygon?.properties.ID !== polygons.data[activeIndex].properties.ID
						: activePolygon?.properties.ID !== polygons.data[activeIndex].properties.ID)
						? { ...polygons.data[activeIndex] }
						: prev
				)
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [illustratePolygons, illustrateValue, polygons])

	return (
		<>
			{activePolygon && (
				<Polygon positions={polygonNormalizer(activePolygon)} pathOptions={{ color: 'black' }}></Polygon>
			)}
		</>
	)
}
