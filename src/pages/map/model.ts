import * as turf from '@turf/turf'
import { attach, combine, createEffect, createEvent, createStore, sample } from 'effector'
import L from 'leaflet'

import { ClientSearchFactory } from '~src/features/client-search'

import { ClientFavoriteFactory } from '~src/entities/client'
import { sessionModel } from '~src/entities/session'

import {
	type ClientAnalytic,
	clientApi,
	type ClientInfo,
	type ClientLandPlot,
	type ClientLandShortPlot,
	type ClientSearchHint,
	cultureApi,
	type CultureReference,
	districtApi,
	type DistrictLand,
	type RegionAnalytic,
	regionApi,
	type RegionLand,
} from '~src/shared/api'

export const CENTER = [48.356, 66.687] as L.LatLngTuple
export const ZOOM = 5

export const mapPageMounted = createEvent<void>()
export const mapPageUnmounted = createEvent<void>()
export const mapMounted = createEvent<L.Map>()

export const regionSettled = createEvent<number>()
export const districtSettled = createEvent<number>()
export const clientSettled = createEvent<number>()
export const clientPlotSettled = createEvent<number>()

export const regionViewedClicked = createEvent<void>()
export const districtsViewedClicked = createEvent<void>()
export const clientsGuidViewedClicked = createEvent<void>()

export const sidebarClicked = createEvent<void>()
export const sidebarOpened = createEvent<void>()
export const sidebarClosed = createEvent<void>()

export const toolbarClicked = createEvent<void>()
export const toolbarOpened = createEvent<void>()
export const toolbarClosed = createEvent<void>()

export const circleDrawn = createEvent<L.LayersControlEvent>()
export const circleDeleted = createEvent<any>()

export const culturesSelected = createEvent<number[]>()

export const $isSidebarOpen = createStore<boolean>(false)
export const $isToolbarOpen = createStore<boolean>(false)

export const $map = createStore<L.Map | null>(null)

export const $activeLand = createStore<Record<'country' | 'region' | 'district' | 'client' | 'clientPlot', boolean>>({
	country: true,
} as any)

export const $regionsOverlay = createStore<RegionLand[]>([])
export const $regionsOverlayPending = createStore<boolean>(false)

export const $regions = createStore<RegionLand[]>([])
export const $regionsPending = createStore<boolean>(false)
export const $regionId = createStore<number | null>(null)
export const $region = combine(
	$regions,
	$regionId,
	(regions, regionId) => regions.find((region) => Number(region.id) === regionId) ?? null,
)

// FIXME: Change this to normal store
export const $regionsAnalytics = createStore<{ year: number; analytics: RegionAnalytic[] }[]>([])
export const $regionsAnalyticsPending = createStore<boolean>(false)

export const $isDistrictsView = createStore<boolean>(false)
export const $districts = createStore<DistrictLand[]>([])
export const $districtsPending = createStore<boolean>(false)
export const $districtId = createStore<number | null>(null)
export const $district = combine(
	$districts,
	$districtId,
	(districts, districtId) => districts.find((district) => Number(district.id) === districtId) ?? null,
)

export const $isClientsPlotsGuidView = createStore<boolean>(false)
export const $clientsPlots = createStore<ClientLandShortPlot[]>([])
export const $clientsPlotsPending = createStore<boolean>(false)
export const $clientId = createStore<number | null>(null)
export const $client = combine(
	$clientsPlots,
	$clientId,
	(clientsPlots, clientId) => clientsPlots.filter((clientPlot) => Number(clientPlot.clientId) === clientId) ?? null,
)

// FIXME: Знай здесь используется данный интерфейс, но данные с запроса другие прилетают
export const $clientsInfo = createStore<ClientInfo[]>([])
export const $clientsInfoPending = createStore<boolean>(false)

export const $cultureRefs = createStore<CultureReference[]>([])
export const $cultureRefsPending = createStore<boolean>(false)

export const $selectedCultures = createStore<number[]>([])
export const $selectedCulturesOptions = combine($cultureRefs, $selectedCultures, (cultureRefs, selectCultures) =>
	cultureRefs.filter((cultureRef) => selectCultures.includes(Number(cultureRef.cultureId))),
)

export const $clientPlots = createStore<ClientLandPlot[]>([])
export const $clientPlotId = createStore<number | null>(null)
export const $clientPlot = combine(
	$clientPlots,
	$clientPlotId,
	(clientPlots, clientPlotId) => clientPlots.find((clientPlot) => Number(clientPlot.plotId) === clientPlotId) ?? null,
)
export const $clientInfo = $clientPlots.map((clientPlots) => {
	if (clientPlots.length === 0) return null

	const clientPlot = clientPlots[0]!
	return {
		guid: clientPlot.guid,
		clientId: clientPlot.clientId,
		clientName: clientPlot.clientName,
		clientAddress: clientPlot.clientAddress,
		clientActivity: clientPlot.clientActivity,
		clientBin: clientPlot.clientBin,
		regionId: clientPlot.regionId,
		districtId: clientPlot.districtId,
	}
})

export const $filterPlots = createStore<{ id: number; plots: ClientLandShortPlot[] }[]>([])
export const $clientPlotsPending = createStore<boolean>(false)

export const $clientAnalytics = createStore<{ year: number; analytics: ClientAnalytic[] }[]>([])
export const $clientAnalyticsPending = createStore<boolean>(false)

export const $mapPending = combine(
	$regionsOverlayPending,
	$regionsPending,
	$districtsPending,
	$clientsPlotsPending,
	$clientPlotsPending,
	(...requests) => requests.some(Boolean),
)

const getPolygonFx = createEffect<{ map: L.Map; geometries: L.LatLngExpression[][][] }, L.Polygon>(({ geometries }) => {
	const polygon = L.polygon(geometries)
	return polygon
})

const regionEvents = createEvents()
const regionFitBoundsFx = attach({
	effect: regionEvents.fitBoundsFx,
	source: { map: $map, region: $region },
	mapParams: (params: void, { map, region }) => {
		if (!map) throw new Error('Map is not defined')
		if (!region) throw new Error('Region is not defined')

		return { map, geometries: region.geometry_rings as any }
	},
})

const clientEvents = createEvents()
const clientFitBoundsFx = attach({
	effect: clientEvents.fitBoundsFx,
	source: { map: $map, client: $client },
	mapParams: (params: void, { map, client }) => {
		if (!map) throw new Error('Map is not defined')
		if (!client) throw new Error('Region is not defined')
		const geometries = client.map((clientPlot) => clientPlot.geometry_rings as any)

		return { map, geometries }
	},
})

const clientPlotEvents = createEvents()
const clientPlotFitBoundsFx = attach({
	effect: clientPlotEvents.fitBoundsFx,
	source: { map: $map, clientPlot: $clientPlot },
	mapParams: (params: void, { map, clientPlot }) => {
		if (!map) throw new Error('Map is not defined')
		if (!clientPlot) throw new Error('Region is not defined')
		return { map, geometries: clientPlot.geometry_rings as any }
	},
})

export const clientSearchModel = ClientSearchFactory.createClientSearch.createModel({ districtId: $regionId })
export const clientsFavoriteModel = ClientFavoriteFactory.createClientFavorite({
	userId: sessionModel.$session.map((session) => (session ? session.id : null)),
})
export const clientFavoriteModel = ClientFavoriteFactory.createClientFavorite({
	userId: sessionModel.$session.map((session) => (session ? session.id : null)),
})

const getPlotsFromCircleDrawnFx = createEffect<
	{ clientsPlots: ClientLandShortPlot[]; event: L.LayersControlEvent },
	{ leafletId: number; filteredPlots: ClientLandShortPlot[] }
>()

const getRegionsOverlayFx = attach({ effect: regionApi.regionsOverlayQuery })
const getRegionsFx = attach({
	effect: regionApi.regionsQuery,
	source: sessionModel.$session,
	mapParams: (params: void, session) => {
		if (!session) throw new Error('Session is not defined')
		return { regionBilling: session.subscribeRegions }
	},
})

const getDistrictsFx = attach({
	effect: districtApi.districtsQuery,
	source: $regionId,
	mapParams: (params: void, regionId) => {
		if (!regionId) throw new Error('Region is not defined')
		return { regionId }
	},
})

const getRegionsAnalyticsFx = attach({
	effect: regionApi.regionsAnalyticsQuery,
	source: sessionModel.$session,
	mapParams: (params: void, session) => {
		if (!session) throw new Error('Session is not defined')
		return { regionIds: session.subscribeRegions }
	},
})

const getClientsPlotsByRegionFx = attach({
	effect: clientApi.clientsPlotsByRegionQuery,
	source: { regionId: $regionId, session: sessionModel.$session },
	mapParams: (params: void, { regionId, session }) => {
		if (!regionId) throw new Error('Region is not defined')
		if (!session) throw new Error('Session is not defined')
		return { regionId, unFollowClients: session.unFollowClients }
	},
})

const getClientsPlotsByCulturesFx = attach({
	effect: clientApi.clientsPlotsByCulturesQuery,
	source: { regionId: $regionId },
	mapParams: (params: { cultureIds: number[] }, { regionId }) => {
		const { cultureIds } = params
		if (!regionId) throw new Error('Region is not defined')
		return { regionId, cultureIds }
	},
})

const getClientsInfoFx = attach({ effect: clientApi.clientsInfoQuery })

const getCultureRefsFx = attach({
	effect: cultureApi.cultureReferencesQuery,
	source: $regionId,
	mapParams: (params: void, regionId) => {
		if (!regionId) throw new Error('Region is not defined')
		return { regionId }
	},
})
const getClientPlotsFx = attach({
	effect: clientApi.clientPlotsQuery,
	source: $clientId,
	mapParams: (params: void, clientId) => {
		if (!clientId) throw new Error('Client is not defined')
		return { clientId }
	},
})
const getClientAnalyticsFx = attach({
	effect: clientApi.clientAnalyticsQuery,
	source: $clientId,
	mapParams: (params: void, clientId) => {
		if (!clientId) throw new Error('Client is not defined')
		return { clientId }
	},
})

sample({
	clock: mapMounted,
	target: $map,
})

sample({
	clock: mapPageMounted,
	target: [getRegionsOverlayFx, getRegionsFx, getRegionsAnalyticsFx],
})

$regionsOverlayPending.on(getRegionsOverlayFx.pending, (state, pending) => pending)
$regionsOverlay.on(getRegionsOverlayFx.doneData, (state, regionsOverlay) => regionsOverlay)
$regionsOverlay.reset(getRegionsOverlayFx, mapPageUnmounted)

$regionsPending.on(getRegionsFx.pending, (state, pending) => pending)
$regions.on(getRegionsFx.doneData, (state, regions) => regions)
$regions.reset(getRegionsFx, mapPageUnmounted)
$regionId.reset(getRegionsFx, mapPageUnmounted)

$regionsAnalyticsPending.on(getRegionsAnalyticsFx.pending, (state, pending) => pending)
$regionsAnalytics.on(getRegionsAnalyticsFx.doneData, (state, regionsAnalytics) =>
	groupAnalyticsByYear(regionsAnalytics),
)
$regionsAnalytics.reset(getRegionsAnalyticsFx, mapPageUnmounted)

$isSidebarOpen.on(sidebarClicked, (state) => !state)
$isSidebarOpen.on(sidebarOpened, (state) => true)
$isSidebarOpen.on(sidebarClosed, (state) => false)

$isToolbarOpen.on(toolbarClicked, (state) => !state)
$isToolbarOpen.on(toolbarOpened, (state) => true)
$isToolbarOpen.on(toolbarClosed, (state) => false)

$districtsPending.on(getDistrictsFx.pending, (state, pending) => pending)
$districts.on(getDistrictsFx.doneData, (state, districts) => districts)
$isDistrictsView.on(districtsViewedClicked, (state) => !state)
$districts.reset(getDistrictsFx, mapPageUnmounted)
$isDistrictsView.reset(mapPageUnmounted)

$clientsPlotsPending.on(
	[getClientsPlotsByRegionFx.pending, getClientsPlotsByCulturesFx.pending],
	(state, pending) => pending,
)
$clientsPlots.on(
	[getClientsPlotsByRegionFx.doneData, getClientsPlotsByCulturesFx.doneData],
	(state, clientsPlots) => clientsPlots,
)
$isClientsPlotsGuidView.on(clientsGuidViewedClicked, (state) => !state)
$clientsPlots.reset(getClientsPlotsByRegionFx, mapPageUnmounted)
$isClientsPlotsGuidView.reset(mapPageUnmounted)

$clientsInfo.on(getClientsInfoFx.doneData, (state, clientsInfo) => clientsInfo)
$clientsInfoPending.on(getClientsInfoFx.pending, (state, pending) => pending)

$cultureRefs.on(getCultureRefsFx.doneData, (state, cultureReferences) => cultureReferences)
$cultureRefsPending.on(getCultureRefsFx.pending, (state, pending) => pending)
$cultureRefs.reset(getCultureRefsFx, mapPageUnmounted)

$clientPlotsPending.on(getClientPlotsFx.pending, (state, pending) => pending)
$clientPlots.on(getClientPlotsFx.doneData, (state, clientPlots) => clientPlots)
$clientPlots.reset(getClientPlotsFx, getClientsPlotsByRegionFx, getClientsPlotsByCulturesFx, mapPageUnmounted)

$selectedCultures.on(culturesSelected, (state, cultures) => cultures)

$clientAnalytics.on(getClientAnalyticsFx.doneData, (state, clientAnalytics) => groupAnalyticsByYear(clientAnalytics))
$clientAnalyticsPending.on(getClientAnalyticsFx.pending, (state, pending) => pending)
$clientAnalytics.reset(getClientAnalyticsFx, mapPageUnmounted)

sample({
	clock: regionSettled,
	target: [regionFitBoundsFx, $regionId],
})

$activeLand.on(regionSettled, () => ({ region: true } as any))

sample({
	clock: $regionId,
	target: [getDistrictsFx, getClientsPlotsByRegionFx, getCultureRefsFx],
})

sample({
	clock: clientSettled,
	target: [clientFitBoundsFx, $clientId],
})

$activeLand.on(clientSettled, () => ({ client: true } as any))

sample({
	clock: $clientId,
	target: [getClientPlotsFx, getClientAnalyticsFx],
})

sample({
	clock: clientPlotSettled,
	target: [clientPlotFitBoundsFx, $clientPlotId],
})

sample({
	clock: circleDrawn,
	source: $clientsPlots,
	fn: (clientsPlots, event) => ({ event, clientsPlots }),
	target: getPlotsFromCircleDrawnFx,
})

getPlotsFromCircleDrawnFx.use(({ event, clientsPlots }) => {
	const layer = event.layer as any
	const id = layer._leaflet_id as number
	const center = layer.getLatLng()
	const radius = Math.floor(layer.getRadius())
	const polygon = turf.circle([center.lng, center.lat], radius, {
		units: 'meters',
	})

	const filteredPlots = clientsPlots.filter((plot) => {
		const result: boolean[] = []

		for (const coord of plot.geometry_rings[0]!) {
			const point = turf.point([coord[1]!, coord[0]!])
			const within = turf.booleanPointInPolygon(point, polygon)
			result.push(within)
		}

		return result.includes(true)
	})

	return { leafletId: id, filteredPlots }
})

$filterPlots.on(getPlotsFromCircleDrawnFx.doneData, (state, { leafletId, filteredPlots }) => [
	...state,
	{ id: leafletId, plots: filteredPlots },
])

sample({
	clock: $filterPlots,
	filter: (filterPlots) => filterPlots.length !== 0,
	fn: (filterPlots) => {
		const clientIds: number[] = []

		for (const filterPlot of filterPlots) {
			for (const plot of filterPlot.plots) {
				if (!clientIds.includes(plot.plotId)) {
					clientIds.push(plot.clientId)
				}
			}
		}

		return { clientIds }
	},
	target: getClientsInfoFx,
})

sample({
	clock: [getClientsPlotsByRegionFx, getClientsPlotsByCulturesFx, mapPageUnmounted],
	source: { map: $map, filterPlots: $filterPlots },
	filter: (source: {
		map: L.Map | null
		filterPlots: { id: number; plots: ClientLandShortPlot[] }[]
	}): source is { map: L.Map; filterPlots: { id: number; plots: ClientLandShortPlot[] }[] } =>
		source.map !== null && source.filterPlots.length !== 0,
	fn: ({ map, filterPlots }) => {
		map.eachLayer((layer) => {
			const findIndex = filterPlots.findIndex((circle) => circle.id === (layer as any)._leaflet_id)
			if (findIndex !== -1) {
				layer.remove()
			}
		})
	},
	target: [$filterPlots.reinit!, $clientsInfo.reinit!],
})
$filterPlots.reset(mapPageUnmounted)

$filterPlots.on(circleDeleted, (state, event) => {
	const layers = event.layers._layers as any
	return state.filter((circle) => !(circle.id in layers))
})

sample({
	clock: clientSearchModel.$currentClientHint,
	filter: (currentClientHint: ClientSearchHint | null): currentClientHint is ClientSearchHint =>
		currentClientHint !== null,
	fn: ({ clientId }) => Number(clientId),
	target: clientSettled,
})

sample({
	clock: $selectedCultures,
	filter: (selectCultures) => selectCultures.length === 0,
	target: getClientsPlotsByRegionFx,
})

sample({
	clock: $selectedCultures,
	filter: (selectCultures) => selectCultures.length !== 0,
	fn: (selectCultures) => ({ cultureIds: selectCultures }),
	target: getClientsPlotsByCulturesFx,
})

sample({
	clock: clientsFavoriteModel.addClientsFavoriteFx.done,
	fn: ({ params }) => params.clientIds,
	target: sessionModel.clientsFavoriteAdded,
})

sample({
	clock: clientFavoriteModel.addClientFavoriteFx.done,
	fn: ({ params }) => [params.clientId],
	target: sessionModel.clientsFavoriteAdded,
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////

type CreateEventsOptions = { [key: string]: any } | void

function createEvents(options: CreateEventsOptions) {
	const setFitBoundsFx = createEffect<{ map: L.Map; geometries: L.LatLngExpression[][][] }, void>(
		async ({ map, geometries }) => {
			const bounds = await (await getPolygonFx({ map, geometries })).getBounds()
			map.fitBounds(bounds)
		},
	)

	const fitBoundsFx = attach({ effect: setFitBoundsFx })

	return { fitBoundsFx }
}

function groupAnalyticsByYear<T extends RegionAnalytic | ClientAnalytic>(analytics: T[]) {
	return analytics.reduce((acc, analytics) => {
		const findIndex = acc.findIndex((acc) => acc.year === analytics.year)
		if (findIndex !== -1) {
			acc[findIndex]!.analytics.push(analytics)
		} else {
			acc.push({ year: analytics.year, analytics: [analytics] })
		}

		return acc
	}, [] as { year: number; analytics: T[] }[])
}
