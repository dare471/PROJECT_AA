export const kek = ''
// import { attach, createEffect, createStore, type Store } from 'effector'
// import L from 'leaflet'

// interface CreateRouting {
// 	map: Store<L.Map | null>
// }

// export function createRouting(options: CreateRouting) {
// 	const { map } = options

// 	const $routing = createStore<L.Routing.Control | null>(null)

// 	const createRoutingFx = attach({
// 		source: map,
// 		effect: (
// 			map,
// 			params: { wayPoints: L.LatLng[]; options?: Omit<L.Routing.RoutingControlOptions, 'wayPoints'> },
// 		): L.Routing.Control => {
// 			const { wayPoints, options } = params
// 			if (!map) throw new Error('Map is not defined')

// 			const routing = L.Routing.control({ waypoints: wayPoints, ...options })
// 			routing.addTo(map)
// 			return routing
// 		},
// 	})

// 	$routing.on(createRoutingFx.doneData, (state, routing) => routing)

// 	return { createRoutingFx, $routing }
// }
