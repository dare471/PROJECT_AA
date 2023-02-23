import { useEvent } from 'effector-react'
import type L from 'leaflet'
import React from 'react'

import type { createMapRouting } from './model'

interface MapRoutingProps extends L.Routing.RoutingControlOptions {
	model: ReturnType<typeof createMapRouting>
}

export function MapRouting(props: MapRoutingProps) {
	const { model, ...routingOptions } = props
	const [handleMapRoutingUnmounted] = useEvent([model.mapRoutingRemoved])

	React.useEffect(() => {
		model.generateMapRoutingFx({ options: routingOptions })

		return () => {
			handleMapRoutingUnmounted()
		}
	}, [routingOptions])

	return null
}
