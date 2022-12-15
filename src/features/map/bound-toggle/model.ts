import { createEvent, split } from 'effector'

import { mapModel } from '~src/entities/map'

export const boundsClicked = createEvent<void>()

export const $isBoundsChecked = mapModel.$hasBounds

split({
	clock: boundsClicked,
	source: $isBoundsChecked,
	match: {
		unset: (isChecked) => isChecked,
		set: (isChecked) => !isChecked
	},
	cases: {
		unset: mapModel.boundsClear,
		set: mapModel.currentBoundsSet
	}
})
