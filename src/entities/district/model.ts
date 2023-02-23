import { attach, createStore } from 'effector'

import { type District, districtApi } from '~src/shared/api'

export function createDistricts() {
	const $districts = createStore<District[]>([])
	const $districtsPending = createStore<boolean>(false)

	const getDistrictsFx = attach({
		effect: districtApi.districtsQuery,
	})

	$districtsPending.on(getDistrictsFx.pending, (_, pending) => pending)
	$districts.on(getDistrictsFx.doneData, (_, districts) => districts)

	return { getDistrictsFx, $districtsPending, $districts }
}
