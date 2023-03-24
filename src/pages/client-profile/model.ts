import { createEvent, createStore, sample } from 'effector'
import { reset } from 'patronum'

import { getLandsPositions, LandsToLandFactory } from '~src/features/lands-to-land'

import {
	ClientPlotsFactory,
	createClient,
	createClientContracts,
	createClientLastContract,
	createClientManagers,
	createClientPoints,
	createClientSubsidies,
} from '~src/entities/client'
import { fitBounds, MapFactory } from '~src/entities/map'

import { type ClientPlot } from '~src/shared/api'
import { createTabs, type Tab, TableFactory } from '~src/shared/ui'

export const clientProfilePageMounted = createEvent<{ clientId: number }>()
export const clientProfilePageUnmounted = createEvent<void>()

export const $clientId = createStore<number | null>(null)

export const $$tabs = createTabs({
	defaultTab: 'main',
	tabs: ['main', 'subsidies', 'contracts'],
})

export const $$map = MapFactory.createMap()
export const $$client = createClient()
export const $$clientPlots = ClientPlotsFactory.createClientPlots()
export const $$clientPlotsToPlot = LandsToLandFactory.createLandsToLand({
	lands: $$clientPlots.$clientPlots.map(getValidClientPlots),
})
export const $$clientPoints = createClientPoints()
export const $$clientManagers = createClientManagers()
export const $$clientLastContract = createClientLastContract()

export const $$clientSubsidies = createClientSubsidies()
export const $$clientSubsidiesTable = TableFactory.createTable({
	data: $$clientSubsidies.$clientSubsidies,
	tableGenerateCb: () => ({}),
})

export const $$clientContracts = createClientContracts()
export const $$clientContractsTable = TableFactory.createTable({
	data: $$clientContracts.$clientContracts,
	tableGenerateCb: () => ({}),
})

const fitBound = fitBounds({
	map: $$map.$map,
	layer: {
		clientPlots: $$clientPlots.$clientPlots.map((clientPlots) => ({ positions: getLandsPositions(clientPlots) })),
		clientPlot: $$clientPlotsToPlot.$land.map((land) => ({ positions: land?.geometryRings ?? [] })),
	},
})

sample({
	clock: clientProfilePageMounted,
	fn: ({ clientId }) => clientId,
	target: $clientId,
})

sample({
	clock: $clientId,
	filter: (clientId: number | null): clientId is number => clientId !== null,
	fn: (clientId) => ({ clientId }),
	target: [$$client.getClientFx, $$clientManagers.getClientManagersFx, $$clientLastContract.getClientLastContractFx],
})

const clientIdOrTabIsMainWillChange = sample({
	clock: [$$tabs.$tab, $clientId],
	source: { tab: $$tabs.$tab, clientId: $clientId },
	filter: (source: { tab: Tab; clientId: number | null }): source is { tab: Tab; clientId: number } =>
		source.clientId !== null,
})

clientIdOrTabIsMainWillChange.watch(({ tab, clientId }) => {
	if (!clientId) return

	if (tab.index === 0) {
		$$clientPlots.getClientPlotsFx({ clientId })
		$$clientPoints.getClientPointsFx({ clientId })
	}
	if (tab.index === 1) {
		$$clientSubsidies.getClientSubsidies({ clientId })
	}
	if (tab.index === 2) {
		$$clientContracts.getClientContractsFx({ clientId })
	}
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

reset({
	clock: clientProfilePageUnmounted,
	target: [
		$$clientPlots.$clientPlots,
		$$clientPlotsToPlot.$landId,
		$$clientSubsidies.$clientSubsidies,
		$$clientContracts.$clientContracts,
	],
})

function getValidClientPlots(clientPlots: ClientPlot[]) {
	return clientPlots.map((clientPlot) => ({ ...clientPlot, id: clientPlot.plotId }))
}
