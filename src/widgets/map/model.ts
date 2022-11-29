import { createEvent, sample } from 'effector'
import { Map } from 'leaflet'

import { mapModel } from '~src/entities/map'

export const mapMounted = createEvent<Map>()

sample({
	clock: mapMounted,
	target: mapModel.setMapControl
})
