import { combine, createEvent, createStore, sample } from 'effector'

import type { ClientLand, ClientLandPlotCulture } from '~src/shared/api'
import { clientLandApi } from '~src/shared/api'

export const getClientsLand = createEvent<{ regionId: number }>()

export const $clientsLand = createStore<ClientLand[] | null>(null)
export const $clientLandId = createStore<number | null>(null)
export const $clientLandPlots = createStore<ClientLandPlotCulture[] | null>(null)
export const $clientLandPlotId = createStore<number | null>(null)

export const $clientLand = combine($clientsLand, $clientLandId, (clientsLand, clientLandId) => {
	if (!clientsLand) return null

	return clientsLand.find((clientLand) => clientLand.clientId === clientLandId) ?? null
})

export const $clientLandPlot = combine(
	$clientLandPlots,
	$clientLandPlotId,
	(clientLandPlots, clientLandPlotId) => {
		if (!clientLandPlots) return null

		return (
			clientLandPlots.find((clientLandPlot) => clientLandPlot.plotid === clientLandPlotId) ?? null
		)
	}
)

sample({
	clock: getClientsLand,
	target: clientLandApi.getClientsLandFromRegionsQuery
})
