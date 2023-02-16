import { createEvent, createStore } from 'effector'
import type L from 'leaflet'

export function createMap() {
	const mapMounted = createEvent<L.Map>()

	const $map = createStore<L.Map | null>(null)

	$map.on(mapMounted, (state, map) => map)

	return { mapMounted, $map }
}
