import { createEvent, createStore, sample } from 'effector'

import { getLandsPositions, LandsToLandFactory } from '~src/features/lands-to-land'

import { ClientPlotsFactory } from '~src/entities/client'
import { fitBounds, MapFactory } from '~src/entities/map'

import { type ClientPlot } from '~src/shared/api'

export const clientBusinessPointMobilePageMounted = createEvent<{ clientId: number }>()
export const clientBusinessPointMobilePageUnMounted = createEvent<void>()

export const $clientId = createStore<number | null>(null)

export const $$map = MapFactory.createMap()
export const $$clientPlots = ClientPlotsFactory.createClientPlots()
export const $$clientPlotsToPlot = LandsToLandFactory.createLandsToLand({
	lands: $$clientPlots.$clientPlots.map(getValidClientPlots),
})

const fitBound = fitBounds({
	map: $$map.$map,
	layer: {
		clientPlots: $$clientPlots.$clientPlots.map((clientPlots) => ({ positions: getLandsPositions(clientPlots) })),
		clientPlot: $$clientPlotsToPlot.$land.map((land) => ({ positions: land?.geometryRings ?? [] })),
	},
})

sample({
	clock: clientBusinessPointMobilePageMounted,
	fn: ({ clientId }) => clientId,
	target: $clientId,
})

sample({
	clock: $clientId,
	filter: (clientId: number | null): clientId is number => clientId !== null,
	fn: (clientId) => ({
		clientId,
	}),
	target: $$clientPlots.getClientPlotsFx,
})

sample({
	clock: $$clientPlots.$clientPlots,
	filter: (clientPlots) => clientPlots.length > 0,
	target: fitBound.clientPlots,
})

sample({
	clock: $$clientPlotsToPlot.landClicked,
	filter: (clientPlot) => clientPlot !== null,
	target: fitBound.clientPlot,
})

function getValidClientPlots(clientPlots: ClientPlot[]) {
	return clientPlots.map((clientPlot) => ({ ...clientPlot, id: clientPlot.plotId }))
}
