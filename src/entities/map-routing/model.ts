import { attach, createEvent, createStore, type Store } from 'effector'
import L from 'leaflet'

interface CreateMapRoutingOptions {
	map: Store<L.Map | null>
}

export function createMapRouting(options: CreateMapRoutingOptions) {
	const { map: $map } = options

	const mapRoutingRemoved = createEvent<void>()

	const $routingControl = createStore<L.Routing.Control | null>(null)

	const generateMapRoutingFx = attach({
		source: $map,
		effect: (map, params: { options: L.Routing.RoutingControlOptions }): L.Routing.Control => {
			const { options } = params
			if (!map) throw new Error('Map is not initialized')
			const routingControl = L.Routing.control(options)
			routingControl.addTo(map)
			return routingControl
		},
	})

	$routingControl.on(generateMapRoutingFx.doneData, (state, routingControl) => routingControl)
	$routingControl.on(mapRoutingRemoved, (state) => {
		if (state) state.remove()
		return null
	})

	return { mapRoutingRemoved, generateMapRoutingFx, $routingControl }
}
