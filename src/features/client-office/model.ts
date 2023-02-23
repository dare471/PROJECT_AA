import { attach, createStore, sample, type Store } from 'effector'
import L from 'leaflet'

import { MapRoutingFactory } from '~src/entities/map-routing'

import { clientApi, type ClientOffice } from '~src/shared/api'

const icon = L.icon({
	iconUrl: 'https://cdn-icons-png.flaticon.com/512/7987/7987463.png',
	iconSize: [35, 35],
})

interface CreateClientOfficeOptions {
	map: Store<L.Map | null>
}

export function createClientOffice(options: CreateClientOfficeOptions) {
	const { map } = options

	const $clientOffice = createStore<ClientOffice | null>(null)
	const $clientOfficePending = createStore<boolean>(false)

	const getClientOfficeFx = attach({
		effect: clientApi.clientOfficeQuery,
	})

	const clientOfficeMapRoutingModel = MapRoutingFactory.createMapRouting({
		map,
	})

	$clientOfficePending.on(getClientOfficeFx.pending, (state, pending) => pending)
	$clientOffice.on(getClientOfficeFx.doneData, (state, clientOffice) => clientOffice)

	sample({
		clock: $clientOffice,
		filter: (clientOffice: ClientOffice | null): clientOffice is ClientOffice => clientOffice !== null,
		fn: (clientOffice) => {
			const waypoints = [L.latLng(clientOffice.clientCoordinate), L.latLng(clientOffice.officeCoordinate)]
			return {
				options: {
					waypoints,
					icon,
				},
			}
		},
		target: clientOfficeMapRoutingModel.generateMapRoutingFx,
	})

	return { getClientOfficeFx, clientOfficeMapRoutingModel, $clientOffice, $clientOfficePending }
}
