import { FC, useEffect } from 'react'
import { useMap } from 'react-leaflet'
import { IMapContentProps } from './types'
import { MapPolygons } from '../polygon'

export const MapContent: FC<IMapContentProps> = ({ position, childrenPolygon, handleChangeCurrentPolygon }) => {
	const map = useMap()

	useEffect(() => {
		map.setView([position.y, position.x], position.zoom)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [position])

	return (
		<>
			{childrenPolygon && (
				<MapPolygons
					polygons={childrenPolygon.data}
					handleChangeCurrentPolygon={handleChangeCurrentPolygon}
					color='indigo'
				></MapPolygons>
			)}
		</>
	)
}
