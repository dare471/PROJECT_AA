import { attach, createStore } from 'effector'

import { cultureApi, type CultureRef } from '~src/shared/api'
import { type Option, SelectFactory } from '~src/shared/ui'

export function createCulturesSelect() {
	const getCulturesRefFx = attach({
		effect: cultureApi.culturesRefQuery,
	})

	const $culturesRef = createStore<CultureRef[]>([])
	const $culturesRefPending = getCulturesRefFx.pending
	const $culturesRefOptions = $culturesRef.map((cultures) =>
		cultures.map(
			(culture) =>
				({
					value: culture.cultureId,
					label: culture.cultureName,
				} as Option),
		),
	)

	const $$select = SelectFactory.createSelect({
		defaultOptions: $culturesRefOptions,
		isMulti: true,
	})

	$culturesRef.on(getCulturesRefFx.doneData, (_, cultures) => cultures)

	return {
		$$select,
		getCulturesRefFx,
		$culturesRefPending,
		$culturesRef,
		$culturesRefOptions,
	}
}
