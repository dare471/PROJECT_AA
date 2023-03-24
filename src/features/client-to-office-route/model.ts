import { attach, createStore, sample, type Store } from 'effector'
import L from 'leaflet'
import { status } from 'patronum'

import { MapRoutingFactory } from '~src/entities/map-routing'

import { clientApi, type ClientToOfficeRoute } from '~src/shared/api'

const icon = L.icon({
	iconUrl: 'https://cdn-icons-png.flaticon.com/512/7987/7987463.png',
	iconSize: [35, 35],
})

interface CreateClientToOfficeRouteOptions {
	map: Store<L.Map | null>
}

export function createClientToOfficeRoute(options: CreateClientToOfficeRouteOptions) {
	const { map } = options
	const getClientToOfficeRouteFx = attach({
		effect: clientApi.clientToOfficeRouteQuery,
	})

	const $clientToOfficeRoute = createStore<ClientToOfficeRoute | null>(null)
	const $clientToOfficeRouteStatus = status({ effect: getClientToOfficeRouteFx })

	const $$clientOfficeMapRouting = MapRoutingFactory.createMapRouting({
		map,
	})

	$clientToOfficeRoute.on(getClientToOfficeRouteFx.doneData, (state, clientToOfficeRoute) => clientToOfficeRoute)

	sample({
		clock: $clientToOfficeRoute,
		filter: (clientOffice: ClientToOfficeRoute | null): clientOffice is ClientToOfficeRoute => clientOffice !== null,
		fn: (clientOffice) => {
			const waypoints = [L.latLng(clientOffice.clientCoordinate), L.latLng(clientOffice.officeCoordinate)]
			return {
				options: {
					waypoints,
					icon,
				},
			}
		},
		target: $$clientOfficeMapRouting.generateMapRoutingFx,
	})

	return { getClientToOfficeRouteFx, $$clientOfficeMapRouting, $clientToOfficeRoute, $clientToOfficeRouteStatus }
}
