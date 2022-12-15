import { createEvent, createStore, sample } from 'effector'

import { mapModel } from '~src/entities/map'

export const xFieldChanged = createEvent<string>()
export const yFieldChanged = createEvent<string>()
export const zoomFieldChanged = createEvent<string>()
export const moveClicked = createEvent<void>()
const fieldsReset = createEvent<void>()

export const $xField = createStore<string>('')
export const $yField = createStore<string>('')
export const $zoomField = createStore<string>('')

$xField.on(xFieldChanged, (_, newXField) => matchFloat(newXField))
$yField.on(yFieldChanged, (_, newYField) => matchFloat(newYField))
$zoomField.on(zoomFieldChanged, (_, newZoomField) => matchFloat(newZoomField))

sample({
	clock: moveClicked,
	source: $xField,
	filter: (xField) => !isNaN(parseFloat(xField)),
	fn: (xField) => parseFloat(xField),
	target: mapModel.positionXSet
})

sample({
	clock: moveClicked,
	source: $yField,
	filter: (yField) => !isNaN(parseFloat(yField)),
	fn: (yField) => parseFloat(yField),
	target: mapModel.positionYSet
})

sample({
	clock: moveClicked,
	source: $zoomField,
	filter: (zoomField) => !isNaN(parseFloat(zoomField)),
	fn: (zoomField) => parseFloat(zoomField),
	target: mapModel.zoomSet
})

sample({
	clock: moveClicked,
	target: fieldsReset
})

sample({
	clock: fieldsReset,
	target: [$xField.reinit!, $yField.reinit!, $zoomField.reinit!]
})

function matchFloat(str: string): string {
	const result = str.match(/[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)/g)
	if (!result) return ''
	return result[0]
}
