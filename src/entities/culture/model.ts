import { attach, createStore } from 'effector'

import { cultureApi, type CultureRef } from '~src/shared/api'

export function createCultures() {
	const $cultures = createStore<CultureRef[]>([])
	const $culturesPending = createStore<boolean>(false)

	const getCulturesRefFx = attach({
		effect: cultureApi.culturesRefQuery,
	})

	$culturesPending.on(getCulturesRefFx.pending, (_, pending) => pending)
	$cultures.on(getCulturesRefFx.doneData, (_, cultures) => cultures)

	return { getCulturesRefFx, $cultures, $culturesPending }
}
