import { FC, useEffect } from 'react'
import { useMap } from 'react-leaflet'
import { IMapPositionProps } from './types'

export const MapPosition: FC<IMapPositionProps> = ({ position }) => {
	const map = useMap()

	useEffect(() => {
		map.setView([position.y, position.x], position.zoom)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [position])

	return null
}
