export const kek = ''
// import { createEvent, createStore, sample } from 'effector'

// import { createDrawToFilterClientsPlots } from '~src/features/draw-in-clients-plots'

// import {
// 	createClientPlot,
// 	createClientPlots,
// 	createClientsPlots,
// 	createClientsPlotsByCultures,
// 	createClientsPlotsByRegion,
// } from '~src/entities/client'
// import { createDistricts } from '~src/entities/district'
// import { MapFactory } from '~src/entities/map'
// import { createRegion, createRegions, createRegionsAnalytics, createRegionsOverlay } from '~src/entities/region'
// import { sessionModel } from '~src/entities/session'

// import { type Session } from '~src/shared/api'
// import { createTabs } from '~src/shared/ui'

// // Events
// export const mapPageMounted = createEvent<void>()
// export const mapPageUnmounted = createEvent<void>()

// export const sidebarClicked = createEvent<void>()

// export const isViewDistrictsChanged = createEvent<void>()

// // Stores
// export const $isSidebarOpen = createStore<boolean>(false)

// export const $isViewDistricts = createStore<boolean>(false)

// export const $mapPagePending = createStore<boolean>(false)

// // Factories
// export const mapModel = MapFactory.createMap()
// export const tabsModel = createTabs({
// 	defaultTab: 0,
// 	tabs: {
// 		lists: 0,
// 		analytics: 1,
// 		information: 2,
// 	},
// })
// tabsModel.$tab.watch(console.log)

// export const regionsOverlayModel = createRegionsOverlay()
// export const regionsModel = createRegions({
// 	map: mapModel.$map,
// 	regionIds: sessionModel.$session.map((session) => (session ? session.subscribeRegions : [])),
// })
// export const regionModel = createRegion({
// 	map: mapModel.$map,
// 	regions: regionsModel.$regions,
// })
// export const regionAnalyticsModel = createRegionsAnalytics({
// 	regionIds: sessionModel.$session.map((session) => (session ? session.subscribeRegions : [])),
// })

// export const districtsModel = createDistricts({
// 	map: mapModel.$map,
// 	regionId: regionModel.$regionId,
// })

// export const clientsPlotsByRegionsModel = createClientsPlotsByRegion({
// 	regionId: regionModel.$regionId,
// 	unFollowClientIds: sessionModel.$session.map((session) => (session ? session.unFollowClients : [])),
// })
// export const clientsPlotsByCulturesModel = createClientsPlotsByCultures({
// 	regionId: regionModel.$regionId,
// 	cultureIds: createStore<number[]>([]),
// })
// export const clientsPlotsModel = createClientsPlots({ map: mapModel.$map })
// export const filterClientsPlotsModel = createDrawToFilterClientsPlots({ clientsPlots: clientsPlotsModel.$clientsPlots })

// export const clientPlotsModel = createClientPlots({ map: mapModel.$map })
// export const clientPlotModel = createClientPlot({ map: mapModel.$map, clientPlots: clientPlotsModel.$clientPlots })
// // export const clientAnalytics = createClientAnalytics({ clientId: clientPlotsModel })

// sample({
// 	clock: mapPageMounted,
// 	target: [regionsOverlayModel.getRegionsOverlayFx, regionsModel.getRegionsFx],
// })

// sample({
// 	clock: mapPageMounted,
// 	source: sessionModel.$session,
// 	filter: (session: Session | null): session is Session => session !== null && session.subscribeRegions.length === 1,
// 	fn: (session) => session.subscribeRegions[0] as number,
// 	target: regionModel.regionSettled,
// })

// $isSidebarOpen.on(sidebarClicked, (state) => !state)

// sample({
// 	clock: regionModel.regionSettled,
// 	source: $isViewDistricts,
// 	filter: (isViewDistricts) => isViewDistricts,
// 	target: [districtsModel.getDistrictsFx, regionModel.fitBoundsRegionFx],
// })

// sample({
// 	clock: regionModel.regionSettled,
// 	source: $isViewDistricts,
// 	filter: (isViewDistricts) => !isViewDistricts,
// 	target: [clientsPlotsByRegionsModel.getClientsPlotsFx, regionModel.fitBoundsRegionFx],
// })

// clientsPlotsModel.$clientsPlotsPending.on(
// 	[clientsPlotsByRegionsModel.$clientsPlotsPending, clientsPlotsByCulturesModel.$clientsPlotsPending],
// 	(_, pending) => pending,
// )
// clientsPlotsModel.$clientsPlots.on(
// 	[clientsPlotsByRegionsModel.$clientsPlots, clientsPlotsByCulturesModel.$clientsPlots],
// 	(_, clientsPlots) => clientsPlots,
// )

// sample({
// 	source: [
// 		regionsOverlayModel.$overlayRegionsPending,
// 		regionsModel.$regionsPending,
// 		districtsModel.$districtsPending,
// 		clientsPlotsModel.$clientsPlotsPending,
// 		clientPlotsModel.$clientPlotsPending,
// 	],
// 	fn: ([...pending]) => pending.some((pending) => pending === true),
// 	target: $mapPagePending,
// })

// $isSidebarOpen.reset(mapPageUnmounted)
