import { attach, createStore } from 'effector'

import { type Region, type RegionAnalytic, regionApi } from '~src/shared/api'

import { $$session } from '../session'

export function createRegionsOverlay() {
	const $regionsOverlay = createStore<Region[]>([])
	const $regionsOverlayPending = createStore<boolean>(false)

	const getRegionsOverlayFx = attach({
		effect: regionApi.regionsOverlayQuery,
	})

	$regionsOverlayPending.on(getRegionsOverlayFx.pending, (_, pending) => pending)
	$regionsOverlay.on(getRegionsOverlayFx.doneData, (_, regionsOverlay) => regionsOverlay)

	return { getRegionsOverlayFx, $regionsOverlayPending, $regionsOverlay }
}

export function createRegions() {
	const $regions = createStore<Region[]>([])
	const $regionsPending = createStore<boolean>(false)

	const getRegionsFx = attach({
		effect: regionApi.regionsQuery,
		source: $$session.$session,
		mapParams: (params: void, session) => {
			if (!session) throw new Error('Session is not defined')
			return { regionBilling: session.subscribeRegions }
		},
	})

	$regionsPending.on(getRegionsFx.pending, (_, pending) => pending)
	$regions.on(getRegionsFx.doneData, (_, regions) => regions)

	return { getRegionsFx, $regionsPending, $regions }
}

export function createRegionsAnalyticsByYear() {
	const $regionsAnalytics = createStore<RegionAnalytic[]>([])
	const $regionsAnalyticsByYear = $regionsAnalytics.map((regionsAnalytics) =>
		regionsAnalytics.reduce((acc, regionAnalytic) => {
			const year = regionAnalytic.year
			if (!acc[year]) acc[year] = []
			acc[year]!.push(regionAnalytic)
			return acc
		}, {} as Record<string, RegionAnalytic[]>),
	)
	const $regionsAnalyticsPending = createStore<boolean>(false)

	const getRegionsAnalyticsFx = attach({
		effect: regionApi.regionsAnalyticsQuery,
		source: $$session.$session,
		mapParams: (params: void, session) => {
			if (!session) throw new Error('Session is not defined')
			return { regionIds: session.subscribeRegions }
		},
	})

	$regionsAnalyticsPending.on(getRegionsAnalyticsFx.pending, (_, pending) => pending)
	$regionsAnalytics.on(getRegionsAnalyticsFx.doneData, (_, regionsAnalytics) => regionsAnalytics)

	return { getRegionsAnalyticsFx, $regionsAnalyticsPending, $regionsAnalytics, $regionsAnalyticsByYear }
}
