import { createEvent, forward, sample } from 'effector'
import { Map } from 'leaflet'

import { mapModel } from '~src/entities/map'

export const mapMounted = createEvent<Map>()

export const mapMoved = createEvent<{ x: number; y: number }>()
export const mapZoomed = createEvent<number>()

const mapXMoved = mapMoved.filterMap((moved) => moved.x)
const mapYMoved = mapMoved.filterMap((moved) => moved.y)

sample({
	clock: mapMounted,
	target: [mapModel.controlSet, mapModel.currentBoundsSet]
})

forward({
	from: mapXMoved,
	to: mapModel.viewPositionXMoved
})
forward({
	from: mapYMoved,
	to: mapModel.viewPositionYMoved
})

forward({
	from: mapZoomed,
	to: mapModel.viewZoomScaled
})
