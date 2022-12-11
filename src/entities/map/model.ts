import { attach, combine, createEffect, createEvent, createStore, sample } from 'effector'
import { LatLngBoundsExpression, LatLngExpression, Map } from 'leaflet'

export const POSITION_X = 48.356
export const POSITION_Y = 66.687
export const ZOOM = 5

export const controlSet = createEvent<Map>()
export const viewPositionXMoved = createEvent<number>()
export const viewPositionYMoved = createEvent<number>()
export const viewZoomScaled = createEvent<number>()

export const boundsSet = createEvent<LatLngBoundsExpression | null>()
export const currentBoundsSet = createEvent<void>()
export const boundsClear = createEvent<void>()

export const positionXSet = createEvent<number>()
export const positionYSet = createEvent<number>()
export const zoomSet = createEvent<number>()

export const setViewFx = createEffect<
	{ control: Map; position: LatLngExpression; zoom: number },
	void
>()
export const setBoundsFx = createEffect<{ control: Map; bounds: LatLngBoundsExpression }, void>()

export const resetPositionFx = createEffect<void, [number, number]>()
export const resetZoomFx = createEffect<void, number>()

export const $control = createStore<Map | null>(null)
export const $viewPositionX = createStore<number>(POSITION_X)
export const $viewPositionY = createStore<number>(POSITION_Y)
export const $viewZoom = createStore<number>(ZOOM)

$control.watch((control) => control)

export const $viewPosition = combine($viewPositionX, $viewPositionY, (viewX, viewY) => [
	viewX,
	viewY
])

export const $bounds = createStore<LatLngBoundsExpression | null>(null)
export const $hasBounds = $bounds.map((bounds) => !!bounds)

$control.on(controlSet, (_, control) => control)
$viewPositionX.on(viewPositionXMoved, (_, viewX) => viewX)
$viewPositionY.on(viewPositionYMoved, (_, viewY) => viewY)
$viewZoom.on(viewZoomScaled, (_, viewZoom) => viewZoom)

const preSetViewFx = attach({
	source: {
		control: $control,
		viewPositionX: $viewPositionX,
		viewPositionY: $viewPositionY,
		viewZoom: $viewZoom
	},
	effect: async (
		{ control, viewPositionX, viewPositionY, viewZoom },
		{
			nextPositionX,
			nextPositionY,
			nextZoom
		}: { nextPositionX?: number; nextPositionY?: number; nextZoom?: number }
	) => {
		if (!control) throw new Error('control is null')

		const positionX = nextPositionX ?? viewPositionX
		const positionY = nextPositionY ?? viewPositionY
		const zoom = nextZoom ?? viewZoom

		return setViewFx({
			control,
			position: [positionX, positionY] as LatLngExpression,
			zoom
		})
	}
})

const preSetBoundsFx = attach({
	source: $control,
	effect: async (control, nextBounds: LatLngBoundsExpression | null) => {
		if (!control) throw new Error('control is null')
		const bounds = nextBounds ?? []

		return setBoundsFx({ control, bounds })
	}
})

setViewFx.use(({ control, position, zoom }) => {
	control.setView(position, zoom)
})
setBoundsFx.use(({ control, bounds }) => {
	control.setMaxBounds(bounds)
})

resetPositionFx.use(() => [POSITION_X, POSITION_Y])
resetZoomFx.use(() => ZOOM as number)

sample({
	clock: positionXSet,
	fn: (nextPositionX) => ({ nextPositionX }),
	target: preSetViewFx
})

sample({
	clock: positionYSet,
	fn: (nextPositionY) => ({ nextPositionY }),
	target: preSetViewFx
})

sample({
	clock: zoomSet,
	fn: (nextZoom) => ({ nextZoom }),
	target: preSetViewFx
})

sample({
	clock: resetPositionFx.doneData,
	fn: ([nextPositionX, nextPositionY]) => ({ nextPositionX, nextPositionY }),
	target: preSetViewFx
})

sample({
	clock: resetZoomFx.doneData,
	fn: (nextZoom) => ({ nextZoom }),
	target: preSetViewFx
})

sample({
	clock: currentBoundsSet,
	source: $control,
	filter: (control: Map | null): control is Map => !!control,
	fn: (control) => control.getBounds(),
	target: boundsSet
})

sample({
	clock: boundsClear,
	fn: () => null,
	target: boundsSet
})

sample({
	clock: boundsSet,
	target: [$bounds, preSetBoundsFx]
})
