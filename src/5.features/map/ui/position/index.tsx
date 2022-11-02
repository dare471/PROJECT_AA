import { useEffect } from 'react'
import { useMap } from 'react-leaflet'

export type TPosition = {
	x: number
	y: number
}

type TMapPositionProps = {
	position: TPosition
	zoom: number
}

export const MapPosition = ({ position, zoom }: TMapPositionProps) => {
	const map = useMap()

	useEffect(() => {
		map.setView([position.y, position.x], zoom)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [position])

	return null
}
