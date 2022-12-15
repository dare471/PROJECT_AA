import { useStore } from 'effector-react'
import type { LatLngExpression, PolylineOptions } from 'leaflet'
import { polygon as LeafletPolygon } from 'leaflet'
import { useEffect } from 'react'

import type { PolygonEvents } from '../map-model'
import { mapFactory } from '../map-model'

interface Props {
	positions: LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][]
	options?: PolylineOptions
	events?: PolygonEvents
}

export const Polygon = ({ positions, options, events }: Props) => {
	const model = mapFactory.useModel()

	const map = useStore(model.$map)
	// const [setPolygon, removePolygon] = useUnit([model.polygonSet, model.removePolygonFx])

	useEffect(() => {
		if (!map) return
		// setPolygon({ positions, options, events })
		const polygon = LeafletPolygon(positions, options)
		polygon.addTo(map)

		if (events?.click) {
			polygon.on('click', events?.click)
		}

		return () => {
			polygon.remove()
		}
	}, [positions, options])

	return null
}
