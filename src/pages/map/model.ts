import { combine, createEvent, createStore, guard, merge, sample } from 'effector'

import { ClientAnalyticsByYearFactory } from '~src/features/client-analytics-by-year'
import { ClientSearchFactory } from '~src/features/client-search'
import { createClientsPlotsInCircle } from '~src/features/clients-plots-in-circle'
import { ClientsSelectFactory } from '~src/features/clients-select-cards'
import { CulturesSelectFactory } from '~src/features/cultures-select'
import { getLandsPositions, LandsToLandFactory } from '~src/features/lands-to-land'
import { MuchClientPlotsFactory } from '~src/features/much-client-plots'
import { MuchClientsLandFactory } from '~src/features/much-clients-land'
import { RegionSelectFactory } from '~src/features/region-select'
import { RegionsTreeViewFactory } from '~src/features/regions-tree-view'

import { filterClientsPlotsInCircleFx } from '~src/entities/client'
import { CulturesFactory } from '~src/entities/culture'
import { createDistricts } from '~src/entities/district'
import { clearAllCircles } from '~src/entities/map'
import { fitBounds, MapFactory } from '~src/entities/map'
import { createClientPoints } from '~src/entities/new-client'
import { createRegions, createRegionsOverlay, RegionsAnalyticsByYearFactory } from '~src/entities/region'
import { $$session } from '~src/entities/session'

import { type District } from '~src/shared/api'
import { createTabs, type Option } from '~src/shared/ui'

export const mapPageMounted = createEvent<void>()
export const mapPageUnmounted = createEvent<void>()

const resetRegion = createEvent<void>()
const resetDistrict = createEvent<void>()
const resetClientLand = createEvent<void>()
const resetClientPlot = createEvent<void>()

export const sidebarToggled = createEvent<void>()
export const toolbarToggled = createEvent<void>()
export const clientsSeparateToggled = createEvent<void>()
export const showAfterRegionToggled = createEvent<void>()

export const culturesLegendToggled = createEvent<void>()

export const addClientsToFavorite = createEvent<void>()

export const $mapShow = createStore<'region' | 'district' | 'clientsLand' | 'clientPlots' | 'clientPlot'>('region')
export const $showAfterRegion = createStore<'districts' | 'clientsLand'>('clientsLand')

export const $isSidebarOpen = createStore<boolean>(false)
export const $isToolbarOpen = createStore<boolean>(false)
export const $isCulturesLegendOpen = createStore<boolean>(false)

export const $isClientsSeparate = createStore<boolean>(false)

export const $$sidebarTabs = createTabs({
	defaultTab: 'list',
	tabs: ['list', 'analytic', 'information'],
})
export const $$informationTabs = createTabs({
	defaultTab: 'clientPlots',
	tabs: ['clientPlots', 'clientsLand'],
})

export const $$map = MapFactory.createMap()
export const $$regionsOverlay = createRegionsOverlay()
export const $$regions = createRegions()
export const $$districts = createDistricts()
export const $$clientsLand = MuchClientsLandFactory.createMuchClientsLand()
export const $$clientPlots = MuchClientPlotsFactory.createClientPlots()
export const $$clientPoints = createClientPoints()

export const $$regionsToRegion = LandsToLandFactory.createLandsToLand({
	lands: $$regions.$regions,
})
export const $$districtsToDistrict = LandsToLandFactory.createLandsToLand({
	lands: $$districts.$districts,
})
export const $$clientsLandToClientLand = LandsToLandFactory.createLandsToLand({
	lands: $$clientsLand.$clientsLand.map((clientsLand) =>
		clientsLand.map((clientLand) => ({ ...clientLand, id: clientLand.clientId })),
	),
	landCb: ({ lands, landId }) => {
		const clientPlots = lands.filter((land) => land.id === landId)
		if (clientPlots.length === 0) return null
		return {
			...clientPlots[0]!,
			geometryRings: clientPlots.map((clientPlot) => clientPlot.geometryRings[0]) as number[][][],
		}
	},
})
export const $$clientPlotsToClientPlot = LandsToLandFactory.createLandsToLand({
	lands: $$clientPlots.$clientPlots.map((clientPlots) =>
		clientPlots.map((clientPlot) => ({ ...clientPlot, id: clientPlot.plotId })),
	),
})
export const $$regionsTreeView = RegionsTreeViewFactory.createRegionsTreeView({
	regions: $$regions.$regions,
	districts: $$districts.$districts,
	regionId: $$regionsToRegion.$landId,
	districtId: $$districtsToDistrict.$landId,
	regionIdSet: $$regionsToRegion.landClicked,
	districtIdSet: $$districtsToDistrict.landClicked,
})
export const $$regionsAnalyticsByYear = RegionsAnalyticsByYearFactory.createRegionsAnalyticsByYear()
export const $$clientAnalyticsByYear = ClientAnalyticsByYearFactory.createClientAnalyticsByYear()
export const $$culturesSelect = CulturesSelectFactory.createCulturesSelect()
export const $$regionSelect = RegionSelectFactory.createRegionSelect({
	regions: $$regions.$regions,
})
export const $$cultures = CulturesFactory.createCultures()
export const $$clientsPlotsInCircle = createClientsPlotsInCircle({
	isMulti: true,
})
export const $$clientSearch = ClientSearchFactory.createClientSearch.createModel({
	districtId: $$regionsToRegion.$landId,
})
export const $$clientsSelect = ClientsSelectFactory.createClientsSelect({
	clients: $$clientsPlotsInCircle.$circlesClients,
})

export const $mapPending = combine(
	$$regionsOverlay.$regionsOverlayPending,
	$$regions.$regionsPending,
	$$districts.$districtsPending,
	$$clientsLand.$clientsLandPending,
	$$clientPlots.$clientPlotsPending,
	(...pendings) => pendings.some((pending) => pending),
)

const fitBound = fitBounds({
	map: $$map.$map,
	layer: {
		regions: $$regions.$regions.map((regions) => ({ positions: getLandsPositions(regions) })),
		region: $$regionsToRegion.$land.map((region) => ({ positions: region?.geometryRings ?? [] })),
		districts: $$districts.$districts.map((districts) => ({ positions: getLandsPositions(districts) })),
		district: $$districtsToDistrict.$land.map((district) => ({ positions: district?.geometryRings ?? [] })),
		clientsLand: $$clientsLand.$clientsLand.map((clientsLand) => ({ positions: getLandsPositions(clientsLand) })),
		clientLand: $$clientsLandToClientLand.$land.map((clientLand) => ({ positions: clientLand?.geometryRings ?? [] })),
		clientPlots: $$clientPlots.$clientPlots.map((clientPlots) => ({ positions: getLandsPositions(clientPlots) })),
		clientPlot: $$clientPlotsToClientPlot.$land.map((clientPlot) => ({ positions: clientPlot?.geometryRings ?? [] })),
	},
})
const clearAllCirclesFx = clearAllCircles({
	map: $$map.$map,
})

sample({
	clock: mapPageMounted,
	target: [
		$$regionsOverlay.getRegionsOverlayFx,
		$$regions.getRegionsFx,
		$$regionsAnalyticsByYear.getRegionsAnalyticsFx,
	],
})

$isSidebarOpen.on(sidebarToggled, (isOpen) => !isOpen)
$isToolbarOpen.on(toolbarToggled, (isOpen) => !isOpen)
$isClientsSeparate.on(clientsSeparateToggled, (isSeparate) => !isSeparate)
$isCulturesLegendOpen.on(culturesLegendToggled, (isOpen) => !isOpen)
$showAfterRegion.on(showAfterRegionToggled, (showAfterRegion) =>
	showAfterRegion === 'districts' ? 'clientsLand' : 'districts',
)

sample({
	clock: $$regionSelect.selectModel.$selectOption,
	filter: (option: Option | null): option is Option => option !== null,
	fn: (option) => option.value as number,
	target: $$regionsToRegion.landClicked,
})
sample({
	source: $$regionsToRegion.$landId,
	filter: (region: number | null): region is number => region !== null,
	fn: (regionId) => ({ regionId }),
	target: [fitBound.region, $$culturesSelect.getCulturesRefFx, $$cultures.getCulturesRefFx],
})

const districtsWillShow = guard({
	source: { regionId: $$regionsToRegion.$landId, showAfterRegion: $showAfterRegion },
	filter: (source: {
		regionId: number | null
		showAfterRegion: 'districts' | 'clientsLand'
	}): source is { regionId: number; showAfterRegion: 'districts' } =>
		source.regionId !== null && source.showAfterRegion === 'districts',
})

sample({
	clock: districtsWillShow,
	target: [$$districts.getDistrictsFx, $$clientsLand.resetClientsLand, resetClientLand, fitBound.region],
})

$$clientsLand.$clientsLand.watch(console.log)

sample({
	clock: $$districtsToDistrict.landClicked,
	source: $$districtsToDistrict.$land,
	filter: (district: District | null): district is District => district !== null,
	target: fitBound.district,
})

const clientsLandWillShow = guard({
	source: { regionId: $$regionsToRegion.$landId, showAfterRegion: $showAfterRegion },
	filter: (source: {
		regionId: number | null
		showAfterRegion: 'districts' | 'clientsLand'
	}): source is { regionId: number; showAfterRegion: 'clientsLand' } =>
		source.regionId !== null && source.showAfterRegion === 'clientsLand',
})

sample({
	clock: clientsLandWillShow,
	target: [
		$$clientsLand.$$clientsLandByRegion.getClientsLandFx,
		$$districts.$districts.reinit!,
		$$districtsToDistrict.$landId.reinit!,
		resetDistrict,
		fitBound.region,
	],
})

sample({
	clock: $$clientSearch.clientHintClicked,
	fn: (clientId) => Number(clientId),
	target: $$clientsLandToClientLand.landClicked,
})

sample({
	clock: $$clientsLandToClientLand.landClicked,
	source: { clientLand: $$clientsLandToClientLand.$land, clientPlots: $$clientPlots.$clientPlots },
	filter: ({ clientLand, clientPlots }) => clientLand !== null && clientPlots.length === 0,
	target: fitBound.clientLand,
})

sample({
	clock: $$clientPlots.$clientPlots,
	source: { clientLand: $$clientsLandToClientLand.$land, clientPlots: $$clientPlots.$clientPlots },
	filter: ({ clientLand, clientPlots }) => clientLand === null && clientPlots.length !== 0,
	target: fitBound.clientPlots,
})

$$clientPlots.$clientPlots.watch((clientPlots) => console.log(clientPlots, 'plots'))
$$clientsLandToClientLand.$land.watch((clientLand) => console.log(clientLand, 'land'))

sample({
	clock: $$clientsLandToClientLand.$landId,
	filter: (clientId: number | null): clientId is number => clientId !== null,
	fn: (clientId) => ({ clientId }),
	target: [
		$$clientPlots.getClientPlotsFx,
		$$clientPoints.getClientPointsFx,
		$$clientAnalyticsByYear.getClientAnalyticsFx,
	],
})

sample({
	clock: $$clientsLandToClientLand.$landId,
	filter: (clientId: number | null): clientId is number => clientId !== null,
	fn: () => true,
	target: [
		$isSidebarOpen,
		$$sidebarTabs.tabChanged.prepend(() => 'information'),
		$$informationTabs.tabChanged.prepend(() => 'clientPlots'),
	],
})

const culturesWillChange = guard({
	clock: $$culturesSelect.$$select.$selectOptions,
	source: { regionId: $$regionsToRegion.$landId, options: $$culturesSelect.$$select.$selectOptions },
	filter: (source: { regionId: number | null; options: Option[] }): source is { regionId: number; options: Option[] } =>
		source.regionId !== null,
})

sample({
	clock: culturesWillChange,
	filter: ({ options }) => options.length !== 0,
	fn: ({ regionId, options }) => ({ regionId, cultureIds: options.map((culture) => Number(culture.value)) }),
	target: $$clientsLand.$$clientsLandByCultures.getClientsLandFx,
})

sample({
	clock: culturesWillChange,
	filter: ({ options }) => options.length === 0,
	fn: ({ regionId }) => ({ regionId }),
	target: $$clientsLand.$$clientsLandByRegion.getClientsLandFx,
})

sample({
	clock: $$clientsPlotsInCircle.handleCircleDraw,
	source: $$clientsLand.$clientsLand,
	fn: (clientsPlots, event) => ({
		event,
		clientsPlots,
	}),
	target: filterClientsPlotsInCircleFx,
})

sample({
	clock: filterClientsPlotsInCircleFx.doneData,
	target: $$clientsPlotsInCircle.circleDrawn,
})

// FIXME: fix this
$isSidebarOpen.on($$clientsPlotsInCircle.circleDrawn, () => true)
sample({
	clock: $$clientsPlotsInCircle.circleDrawn,
	target: [
		$$sidebarTabs.tabChanged.prepend(() => 'information'),
		$$informationTabs.tabChanged.prepend(() => 'clientsLand'),
	],
})

sample({
	clock: addClientsToFavorite,
	source: $$clientsSelect.$selectClientIds,
	fn: (clientIds) => ({ clientIds: clientIds.map((clientId) => Number(clientId)) }),
	target: [$$session.addFavoriteClientsFx, $$clientsSelect.$selectClientIds.reinit!],
})

$$clientsPlotsInCircle.$circles.on($$clientsPlotsInCircle.handleCircleRemove, (circles, event) => {
	const layers = event.layers._layers as any
	return circles.filter((circle) => !(circle.circleId in layers))
})

sample({
	clock: $$clientPlotsToClientPlot.landClicked,
	source: $$clientPlotsToClientPlot.$land,
	filter: (clientPlot) => clientPlot !== null,
	target: fitBound.clientPlot,
})

sample({
	clock: mapPageUnmounted,
	target: [$$regions.$regions.reinit!, $$regionsToRegion.$landId.reinit!, resetRegion],
})

$isSidebarOpen.on(mapPageUnmounted, () => false)
$isToolbarOpen.on(mapPageUnmounted, () => false)

sample({
	clock: $$regionsToRegion.$landId,
	target: resetRegion,
})

sample({
	clock: $$districtsToDistrict.$landId,
	target: resetDistrict,
})

sample({
	clock: $$clientsLandToClientLand.$landId,
	target: resetClientLand,
})

sample({
	clock: resetRegion,
	target: [
		$$districts.$districts.reinit!,
		$$districtsToDistrict.$landId.reinit!,
		$$clientsLand.resetClientsLand,
		$$clientsLandToClientLand.$landId.reinit!,
		$$clientPlots.resetClientPlots,
		$$clientPlotsToClientPlot.$landId.reinit!,
		$$clientPoints.resetClientPoints,
		$$clientsPlotsInCircle.$circles.reinit!,
		$$culturesSelect.$culturesRef.reinit!,
		$$culturesSelect.$$select.$selectOptions.reinit!,
		clearAllCirclesFx,
	],
})

sample({
	clock: resetDistrict,
	target: [
		$$clientsLand.resetClientsLand,
		$$clientsLandToClientLand.$landId.reinit!,
		$$clientPlots.resetClientPlots,
		$$clientPlotsToClientPlot.$landId.reinit!,
		$$clientPoints.resetClientPoints,
		$$clientsPlotsInCircle.$circles.reinit!,
		// $$culturesSelect.$culturesRef.reinit!,
		// $$culturesSelect.$$select.$selectOptions.reinit!,
		clearAllCirclesFx,
	],
})

sample({
	clock: resetClientLand,
	target: [
		$$clientPlots.resetClientPlots,
		$$clientPlotsToClientPlot.$landId.reinit!,
		$$clientPoints.resetClientPoints,
		$$clientsPlotsInCircle.$circles.reinit!,
		// $$culturesSelect.$culturesRef.reinit!,
		// $$culturesSelect.$$select.$selectOptions.reinit!,
		clearAllCirclesFx,
	],
})

sample({
	clock: resetClientPlot,
	target: [$$clientPlotsToClientPlot.$landId.reinit!],
})
