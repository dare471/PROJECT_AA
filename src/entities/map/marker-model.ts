import { createEffect, createStore } from 'effector'
import { modelFactory } from 'effector-factorio'
import type { LatLngTuple, Map, Marker, MarkerOptions } from 'leaflet'
import { Marker as LeafletMarker, LeafletMouseEvent } from 'leaflet'

interface MarkerEvents {
	click?: (e: LeafletMouseEvent) => void
}

interface MarkerFactoryOption {}

// Create many events
export const markerFactory = modelFactory(function markerFactory({}: MarkerFactoryOption) {
	const createMarkerFx = createEffect<
		{ position: LatLngTuple; options: MarkerOptions; events?: MarkerEvents },
		Marker
	>()
	const addMarkerFx = createEffect<{ map: Map; marker: Marker }, Marker>()
	const removeMarkerFx = createEffect<{ marker: Marker }, Marker>()

	const $markers = createStore<Marker[]>([])

	createMarkerFx.use(({ position, options, events }) => {
		const marker = new LeafletMarker(position, options)
		if (events?.click) {
			marker.on('click', events.click)
		}

		return marker
	})

	$markers.on(createMarkerFx.doneData, (prevMarkers, marker) => [...prevMarkers, marker])

	addMarkerFx.use(({ map, marker }) => {
		marker.addTo(map)
		return marker
	})

	removeMarkerFx.use(({ marker }) => {
		marker.remove()
		return marker
	})

	return {
		$markers,
		createMarkerFx,
		addMarkerFx,
		removeMarkerFx
	}
})
