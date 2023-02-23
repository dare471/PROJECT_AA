import { attach, combine, createEvent, createStore, guard, sample } from 'effector'
import { reset } from 'patronum'

import { ClientSearchFactory } from '~src/features/client-search'
import { createClientsPlotsInCircle } from '~src/features/clients-plots-in-circle'
import { CulturesSelectFactory } from '~src/features/cultures-select'
import { getLandsPositions, LandsToLandFactory } from '~src/features/lands-to-land'
import { RegionSelectFactory } from '~src/features/region-select'
import { RegionsTreeViewFactory } from '~src/features/regions-tree-view'

import {
	ClientAnalyticsByYearFactory,
	ClientPlotsFactory,
	createClientPoints,
	createClientsLand,
	filterClientsPlotsInCircleFx,
} from '~src/entities/client'
import { createDistricts } from '~src/entities/district'
import { MapFactory } from '~src/entities/map'
import { createRegions, createRegionsOverlay, RegionsAnalyticsByYearFactory } from '~src/entities/region'

import { type District, type Region } from '~src/shared/api'
import { createTabs, type Option } from '~src/shared/ui'

export const mapPageMounted = createEvent<void>()
export const mapPageUnmounted = createEvent<void>()

export const sidebarToggled = createEvent<void>()
export const toolbarToggled = createEvent<void>()
export const clientsSeparateToggled = createEvent<void>()

export const $mapShow = createStore<'region' | 'district' | 'clientsLand' | 'clientPlots' | 'clientPlot'>('region')
export const $showAfterRegion = createStore<'districts' | 'clientsLand'>('clientsLand')

export const $isSidebarOpen = createStore<boolean>(false)
export const $isToolbarOpen = createStore<boolean>(false)

export const $isClientsSeparate = createStore<boolean>(false)

export const $$tabs = createTabs({
	defaultTab: 1,
	tabs: {
		list: 0,
		analytic: 1,
		information: 2,
	},
})

export const $$map = MapFactory.createMap()
export const $$regionsOverlay = createRegionsOverlay()
export const $$regions = createRegions()
export const $$districts = createDistricts()
export const $$clientsLand = createClientsLand()
export const $$clientPlots = ClientPlotsFactory.createClientPlots()
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
		const clientPlots = lands.filter((land) => land.id === landId) ?? []
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
export const $$clientsPlotsInCircle = createClientsPlotsInCircle({
	isMulti: true,
})

export const $$clientSearch = ClientSearchFactory.createClientSearch.createModel({
	districtId: $$regionsToRegion.$landId,
})

export const $mapPending = combine(
	$$regionsOverlay.$regionsOverlayPending,
	$$regions.$regionsPending,
	$$districts.$districtsPending,
	$$clientsLand.$clientsLandPending,
	$$clientPlots.$clientPlotsPending,
	(...pendings) => pendings.some((pending) => pending),
)

const clearAllCirclesFx = attach({
	effect: MapFactory.clearAllCirclesFx,
	source: $$map.$map,
	mapParams: (params: void, map) => ({ map }),
})
const fitRegionsFx = attach({
	source: { map: $$map.$map, regions: $$regions.$regions },
	effect: MapFactory.fitBoundsFx,
	mapParams: (params: void, { map, regions }) => ({ map, positions: getLandsPositions(regions) }),
})
const fitRegionFx = attach({
	effect: MapFactory.fitBoundsFx,
	source: { map: $$map.$map, region: $$regionsToRegion.$land },
	mapParams: (params: void, { map, region }) => ({ map, positions: region?.geometryRings ?? [] }),
})
const fitDistrictsFx = attach({
	source: $$map.$map,
	effect: (map, districts: District[]) => ({ map, positions: getLandsPositions(districts) }),
})
const fitDistrictFx = attach({
	effect: MapFactory.fitBoundsFx,
	source: { map: $$map.$map, district: $$districtsToDistrict.$land },
	mapParams: (params: void, { map, district }) => ({ map, positions: district?.geometryRings ?? [] }),
})
const fitClientsLandFx = attach({
	effect: MapFactory.fitBoundsFx,
	source: { map: $$map.$map, clientsLand: $$clientsLand.$clientsLand },
	mapParams: (params: void, { map, clientsLand }) => ({
		map,
		positions: getLandsPositions(clientsLand.map((clientLand) => ({ ...clientLand, id: clientLand.clientId }))),
	}),
})
const fitClientLandFx = attach({
	effect: MapFactory.fitBoundsFx,
	source: { map: $$map.$map, clientLand: $$clientsLandToClientLand.$land },
	mapParams: (params: void, { map, clientLand }) => ({ map, positions: clientLand?.geometryRings ?? [] }),
})
const fitClientPlotsFx = attach({
	effect: MapFactory.fitBoundsFx,
	source: { map: $$map.$map, clientPlots: $$clientPlots.$clientPlots },
	mapParams: (params: void, { map, clientPlots }) => ({
		map,
		positions: getLandsPositions(clientPlots.map((clientPlot) => ({ ...clientPlot, id: clientPlot.plotId }))),
	}),
})
const fitClientPlotFx = attach({
	effect: MapFactory.fitBoundsFx,
	source: { map: $$map.$map, clientPlot: $$clientPlotsToClientPlot.$land },
	mapParams: (params: void, { map, clientPlot }) => ({ map, positions: clientPlot?.geometryRings ?? [] }),
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

sample({
	clock: $$regionSelect.selectModel.$selectOption,
	filter: (option: Option | null): option is Option => option !== null,
	fn: (option) => option.value as number,
	target: $$regionsToRegion.landClicked,
})

sample({
	source: $$regionsToRegion.$land,
	filter: (region: Region | null): region is Region => region !== null,
	target: fitRegionFx,
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
	target: [$$districts.getDistrictsFx, $$culturesSelect.getCulturesRefFx],
})

sample({
	clock: $$districtsToDistrict.landClicked,
	source: $$districtsToDistrict.$land,
	filter: (district: District | null): district is District => district !== null,
	target: fitDistrictFx,
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
	target: [$$clientsLand.getClientsLandByRegionFx, $$culturesSelect.getCulturesRefFx],
})

sample({
	clock: $$clientSearch.clientHintClicked,
	fn: (clientId) => Number(clientId),
	target: $$clientsLandToClientLand.landClicked,
})

sample({
	clock: $$clientsLandToClientLand.landClicked,
	source: $$clientsLandToClientLand.$land,
	filter: (clientLand) => clientLand !== null,
	target: fitClientLandFx,
})

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
	target: [$isSidebarOpen, $$tabs.tabChanged.prepend(() => 'analytic')],
})

const culturesWillChange = guard({
	source: { regionId: $$regionsToRegion.$landId, options: $$culturesSelect.$$select.$selectOptions },
	filter: (source: { regionId: number | null; options: Option[] }): source is { regionId: number; options: Option[] } =>
		source.regionId !== null,
})

sample({
	clock: culturesWillChange,
	filter: ({ options }) => options.length !== 0,
	fn: ({ regionId, options }) => ({ regionId, cultureIds: options.map((culture) => Number(culture.value)) }),
	target: $$clientsLand.getClientsLandByCulturesFx,
})

sample({
	clock: culturesWillChange,
	filter: ({ options }) => options.length === 0,
	fn: ({ regionId }) => ({ regionId }),
	target: $$clientsLand.getClientsLandByRegionFx,
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

$isSidebarOpen.on($$clientsPlotsInCircle.circleDrawn, () => true)
sample({
	clock: $$clientsPlotsInCircle.circleDrawn,
	fn: () => 'information' as const,
	target: $$tabs.tabChanged,
})

$$clientsPlotsInCircle.$circles.on($$clientsPlotsInCircle.handleCircleRemove, (circles, event) => {
	const layers = event.layers._layers as any
	return circles.filter((circle) => !(circle.circleId in layers))
})

sample({
	clock: $$clientPlotsToClientPlot.landClicked,
	source: $$clientPlotsToClientPlot.$land,
	filter: (clientPlot) => clientPlot !== null,
	target: fitClientPlotFx,
})

reset({
	clock: [mapPageUnmounted, $$regionsToRegion.$landId],
	target: [
		$$regionsToRegion.$landId,
		$$districts.$districts,
		$$clientsLand.$clientsLandByRegion,
		$$clientsLand.$clientsLandByCultures,
		$$clientsLandToClientLand.$landId,
		$$clientPlots.$clientPlots,
		$$clientPlotsToClientPlot.$landId,
		$$culturesSelect.$culturesRef,
		$$culturesSelect.$$select.$selectOptions,
		$$clientsPlotsInCircle.$circles,
	],
})

sample({
	clock: [mapPageUnmounted, $$regionsToRegion.$landId],
	target: clearAllCirclesFx,
})

reset({
	clock: [$$districtsToDistrict.$landId],
	target: [
		$$clientsLand.$clientsLandByRegion,
		$$clientsLand.$clientsLandByCultures,
		$$clientsLandToClientLand.$landId,
		$$clientPlots.$clientPlots,
		$$clientPlotsToClientPlot.$landId,
	],
})

reset({
	clock: [$$clientsLandToClientLand.$landId],
	target: [$$clientPlots.$clientPlots, $$clientPlotsToClientPlot.$landId],
})
