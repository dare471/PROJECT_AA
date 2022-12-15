import { attach, combine, createEvent, createStore, sample, type Store } from 'effector'
import { modelFactory } from 'effector-factorio'

import type { Culture, District, Region } from '~src/shared/api'
import { landApi } from '~src/shared/api'

interface LandFactoryOptions {
	$viewRegions: Store<boolean>
	$viewDistrict: Store<boolean>
}

export const landFactory = modelFactory(function landPolygonFactory(options: LandFactoryOptions) {
	const getRegions = createEvent<void>()
	const getRegionCultures = createEvent<{ regionId: number }>()
	const getDistricts = createEvent<{ regionId: number }>()
	const regionClicked = createEvent<Region>()
	const districtClicked = createEvent<District>()
	const regionIdSet = createEvent<number>()
	const districtIdSet = createEvent<number>()

	const getRegionsFx = attach({ effect: landApi.getRegionsQuery })
	const getRegionCulturesFx = attach({ effect: landApi.getRegionCulturesQuery })
	const getDistrictsFx = attach({ effect: landApi.getDistrictsQuery })

	const $regions = createStore<Region[] | null>(null)
	const $regionId = createStore<number | null>(null)
	const $regionCultures = createStore<Culture[] | null>(null)

	const $districts = createStore<District[] | null>(null)
	const $districtId = createStore<number | null>(null)
	const $districtCultures = createStore<Culture[] | null>(null)

	const $region = combine($regions, $regionId, (regions, regionId) => {
		if (!regions || !regionId) return null

		return regions.find((region) => region.regionId === regionId) ?? null
	})
	const $district = combine($districts, $districtId, (districts, districtId) => {
		if (!districts || !districtId) return null

		return districts.find((district) => district.districtId === districtId) ?? null
	})

	$regions.reset(getRegions)

	sample({
		clock: getRegions,
		filter: options.$viewRegions,
		target: getRegionsFx
	})

	$regions.on(getRegionsFx.doneData, (_, regions) => regions)

	sample({
		clock: regionClicked,
		fn: ({ regionId }) => regionId,
		target: regionIdSet
	})

	$regionId.on(regionIdSet, (_, id) => id)

	sample({
		clock: $regionId,
		filter: (regionId: number | null): regionId is number => Boolean(regionId),
		fn: (regionId) => ({ regionId }),
		target: [getDistricts, getRegionCultures]
	})

	sample({
		clock: getDistricts,
		filter: options.$viewRegions,

		target: getRegionCulturesFx
	})

	$regionCultures.on(getRegionCulturesFx.doneData, (_, cultures) => cultures)

	$districts.reset(getDistricts)

	sample({
		clock: getDistricts,
		filter: options.$viewDistrict,
		target: getDistrictsFx
	})

	sample({
		clock: districtClicked,
		fn: ({ districtId }) => districtId,
		target: districtIdSet
	})

	$districtId.on(districtIdSet, (_, id) => id)

	$districts.on(getDistrictsFx.doneData, (_, districts) => districts)

	return {
		$regions,
		$regionId,
		$region,
		$regionCultures,
		$districts,
		$districtId,
		$district,
		$districtCultures,
		regionClicked,
		districtClicked,
		getRegions,
		getDistricts,
		getRegionsFx,
		getDistrictsFx,
		getRegionCulturesFx,
		regionIdSet,
		districtIdSet
	}
})
