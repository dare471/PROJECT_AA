import { attach, createEvent, createStore, sample } from 'effector'
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
import { MapFactory } from '~src/entities/map'

import { type ClientPlot } from '~src/shared/api'
import { createTabs, TableFactory } from '~src/shared/ui'

const TABS = { main: 0, subsidies: 1, contracts: 2 }

export const clientProfilePageMounted = createEvent<{ clientId: number }>()
export const clientProfilePageUnmounted = createEvent<void>()

export const $clientId = createStore<number | null>(null)

export const $$tabs = createTabs({
	defaultTab: TABS.main,
	tabs: TABS,
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

const fitClientPlotsFx = attach({
	effect: MapFactory.fitBoundsFx,
	source: { map: $$map.$map, clientPlots: $$clientPlots.$clientPlots },
	mapParams: (params: void, { map, clientPlots }) => ({
		map,
		positions: getLandsPositions(getValidClientPlots(clientPlots)),
	}),
})
const fitClientPlot = attach({
	effect: MapFactory.fitBoundsFx,
	source: { map: $$map.$map, clientPlot: $$clientPlotsToPlot.$land },
	mapParams: (params: void, { map, clientPlot }) => ({ map, positions: clientPlot?.geometryRings ?? [] }),
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
	source: { tabIndex: $$tabs.$tab, clientId: $clientId },
	filter: (source: { tabIndex: number; clientId: number | null }): source is { tabIndex: number; clientId: number } =>
		source.clientId !== null,
})

clientIdOrTabIsMainWillChange.watch(({ tabIndex, clientId }) => {
	if (!clientId) return

	if (tabIndex === TABS.main) {
		$$clientPlots.getClientPlotsFx({ clientId })
		$$clientPoints.getClientPointsFx({ clientId })
	}
	if (tabIndex === TABS.subsidies) {
		$$clientSubsidies.getClientSubsidies({ clientId })
	}
	if (tabIndex === TABS.contracts) {
		$$clientContracts.getClientContractsFx({ clientId })
	}
})

sample({
	clock: $$clientPlots.$clientPlots,
	target: fitClientPlotsFx,
})

sample({
	clock: $$clientPlotsToPlot.landClicked,
	target: fitClientPlot,
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
