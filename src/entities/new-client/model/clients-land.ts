import { attach, createStore } from 'effector'
import { reset, status } from 'patronum'

import { clientApi, type ClientPlotByCultures, type ClientPlotByRegion } from '~src/shared/api'

export function createClientsLandByCultures() {
	const getClientsLandFx = attach({
		effect: clientApi.clientsLandByCulturesQuery,
	})

	const $clientsLand = createStore<ClientPlotByCultures[]>([])
	const $clientsLandStatus = status({ effect: getClientsLandFx })

	$clientsLand.on(getClientsLandFx.doneData, (_, clients) => clients)
	const resetClientsLand = reset({ target: $clientsLand })

	return { getClientsLandFx, resetClientsLand, $clientsLand, $clientsLandStatus }
}

export function createClientsLandByRegion() {
	const getClientsLandFx = attach({
		effect: clientApi.clientsLandByRegionQuery,
	})

	const $clientsLand = createStore<ClientPlotByRegion[]>([])
	const $clientsLandStatus = status({ effect: getClientsLandFx })

	$clientsLand.on(getClientsLandFx.doneData, (_, clients) => clients)
	const resetClientsLand = reset({ target: $clientsLand })

	return { getClientsLandFx, resetClientsLand, $clientsLand, $clientsLandStatus }
}
