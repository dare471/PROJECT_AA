import { combine, createEvent, createStore, sample } from 'effector'

import { landApi } from '~src/shared/api'

export const getRegions = createEvent<void>()
export const getDistricts = createEvent<{ regionId: number }>()

export const regionIdSet = createEvent<number>()
export const districtIdSet = createEvent<number>()

export const $regions = landApi.getRegionsQuery.$data
export const $districts = landApi.getDistrictsQuery.$data

export const $regionId = createStore<number | null>(null)
export const $districtId = createStore<number | null>(null)

export const $region = combine($regions, $regionId, (regions, regionId) => {
	if (!regions || !regionId) return null

	const region = regions.find((region) => region.regionId === regionId)
	return region ?? null
})

export const $district = combine($districts, $districtId, (districts, districtId) => {
	if (!districts || !districtId) return null

	const district = districts.find((district) => district.districtId === districtId)
	return district ?? null
})

$regionId.on(regionIdSet, (_, regionId) => regionId)
$districtId.on(districtIdSet, (_, districtId) => districtId)

//FIXME: if it's have side effect remove
$regions.reset(getRegions)
$districts.reset(getDistricts)

sample({ clock: getRegions, target: landApi.getRegionsQuery.start })
// sample({ clock: getDistricts, target: landApi.getDistrictsQuery.start })

sample({
	clock: $regionId,
	filter: filterLandId,
	fn: (regionId) => ({ regionId }),
	target: getDistricts
})

export function filterLandId(id: number | null): id is number {
	if (id === 0) return true

	return Boolean(id)
}
