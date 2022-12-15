import { useStore } from 'effector-react'
import type { LatLngTuple, MarkerOptions } from 'leaflet'
import { Marker as LeafletMarker } from 'leaflet'
import { useEffect } from 'react'

import { mapFactory } from '../map-model'

interface Props {
	position: LatLngTuple
	options?: MarkerOptions
}

export const Marker = ({ position, options }: Props) => {
	const model = mapFactory.useModel()
	const map = useStore(model.$map)

	useEffect(() => {
		if (!map) return

		const marker = new LeafletMarker(position, options)
		marker.addTo(map)

		return () => {
			marker.remove()
		}
	}, [position, options])

	return null
}
