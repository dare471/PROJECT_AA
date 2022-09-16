import { LatLng, LatLngExpression } from 'leaflet'
import { FC, useEffect } from 'react'
import { Polygon, useMap } from 'react-leaflet'
import { useSearchParams } from 'react-router-dom'
import { IMapContentProps } from './types'
import { illustrateChecker } from '../../lib/illustrate-checker'
import { MapPolygons } from '../polygons'
import { MapActivePolygon } from '../polygons/active-polygon/ui'
import './styles.scss'

export const MapContent: FC<IMapContentProps> = ({
	position,
	illustratePolygons,
	areaPolygons,
	districtPolygons,
	polygons,
	activePolygon,
	setActivePolygon
}) => {
	const [searchParams] = useSearchParams()
	const illustrate = illustrateChecker(illustratePolygons, 'nothing')
	const map = useMap()

	useEffect(() => {
		map.setView([position.y, position.x], position.zoom)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [position])

	return (
		<>
			{illustrateChecker(illustratePolygons, 'area') && areaPolygons && (
				<MapPolygons
					illustratePolygons={illustratePolygons}
					polygons={areaPolygons}
					activePolygon={activePolygon}
				></MapPolygons>
			)}
			{illustrateChecker(illustratePolygons, 'district') &&
				districtPolygons && (
					<MapPolygons
						illustratePolygons={illustratePolygons}
						polygons={districtPolygons}
						activePolygon={activePolygon}
					></MapPolygons>
				)}
			{illustrateChecker(illustratePolygons, 'polygon') && polygons && (
				<>
					{polygons
						.filter((item: any) => searchParams.get(illustrate) !== item.ID)
						.map((polygon: any, index: number) => (
							<Polygon
								key={index + polygon}
								positions={polygon?.COORDINATES ? polygon.COORDINATES : []}
								eventHandlers={{
									click() {
										console.log(polygon.KADASTR)
									}
								}}
							></Polygon>
						))}
				</>
			)}

			{illustrateChecker(illustratePolygons, 'district') && (
				<MapActivePolygon
					activePolygon={activePolygon}
					setActivePolygon={setActivePolygon}
					polygons={districtPolygons}
					illustratePolygons={illustratePolygons}
				/>
			)}
		</>
	)
}
