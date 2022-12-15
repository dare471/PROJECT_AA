import { useStore } from 'effector-react'
import { LatLngExpression, polyline as LeafletPolyline, PolylineOptions } from 'leaflet'
import { useEffect } from 'react'

import type { PolylineEvents } from '../map-model'
import { mapFactory } from '../map-model'

interface Props {
	positions: LatLngExpression[] | LatLngExpression[][]
	options?: PolylineOptions
	events?: PolylineEvents
}

export const Polyline = ({ positions, options, events }: Props) => {
	const model = mapFactory.useModel()
	const map = useStore(model.$map)
	// const setPolyline = useUnit(model.polylineSet)

	useEffect(() => {
		if (!map) return
		// setPolyline({ positions, options, events })
		const polyline = LeafletPolyline(positions, options)

		polyline.addTo(map)
		if (events?.click) {
			polyline.on('click', events?.click)
		}

		return () => {
			polyline.remove()
		}
	}, [positions, options])

	return null
}
