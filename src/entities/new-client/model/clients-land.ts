import { attach, createStore } from 'effector'

import { $$session } from '~src/entities/session'

import { clientApi, type ClientPlotByCultures, type ClientPlotByRegion } from '~src/shared/api'

export function createClientsLandByCultures() {
	const $clientsLand = createStore<ClientPlotByCultures[]>([])
	const $clientsLandPending = createStore<boolean>(false)

	const getClientsLandFx = attach({
		effect: clientApi.clientsLandByCulturesQuery,
	})

	$clientsLandPending.on(getClientsLandFx.pending, (_, pending) => pending)
	$clientsLand.on(getClientsLandFx.doneData, (_, clients) => clients)

	return { getClientsLandFx, $clientsLand, $clientsLandPending }
}

export function createClientsLandByRegion() {
	const $clientsLand = createStore<ClientPlotByRegion[]>([])
	const $clientsLandPending = createStore<boolean>(false)

	const getClientsLandFx = attach({
		effect: clientApi.clientsLandByRegionQuery,
		source: $$session.$session,
		mapParams: (params: { regionId: number }, session) => {
			const { regionId } = params
			if (!session) throw new Error('Session is not defined')
			return { regionId, unFollowClients: session.unSubscribeClients }
		},
	})

	$clientsLandPending.on(getClientsLandFx.pending, (_, pending) => pending)
	$clientsLand.on(getClientsLandFx.doneData, (_, clients) => clients)

	return { getClientsLandFx, $clientsLand, $clientsLandPending }
}
