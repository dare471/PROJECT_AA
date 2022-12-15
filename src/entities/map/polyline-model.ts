import { createEffect, createEvent, createStore, sample } from 'effector'
import { modelFactory } from 'effector-factorio'
import {
	LatLngExpression,
	LeafletMouseEvent,
	polyline as leafletPolyline,
	Map,
	Polyline,
	PolylineOptions
} from 'leaflet'

export interface LeafletPolyline {
	[key: string]: Polyline
}

export interface PolylineEvents {
	click?: (e: LeafletMouseEvent) => void
}

export type LeafletPolylineLatLng = LatLngExpression[] | LatLngExpression[][]

interface PolylineFactoryOptions {}

export const polylineFactory = modelFactory(function polylineFactory(
	options: PolylineFactoryOptions
) {
	const polylineSet = createEvent<{ key: string; value: Polyline }>()

	const createPolylineFx = createEffect<
		{
			position: LeafletPolylineLatLng
			options?: PolylineOptions
			events?: PolylineEvents
		},
		Polyline
	>()
	const addPolylineFx = createEffect<{ map: Map; polyline: Polyline }, Polyline>()
	const removePolylineFx = createEffect<{ polyline: Polyline }, Polyline>()

	const createPolylinesFx = createEffect<
		{
			position: LeafletPolylineLatLng
			options?: PolylineOptions
			events?: PolylineEvents
		}[],
		Polyline[]
	>()
	const addPolylinesFx = createEffect<{ map: Map; polylines: Polyline[] }, Polyline[]>()
	const removePolylinesFx = createEffect<{ polylines: Polyline[] }, Polyline[]>()

	const $polylines = createStore<LeafletPolyline[]>([])

	createPolylineFx.use(({ position, options, events }) => {
		const polyline = leafletPolyline(position, options)
		if (events?.click) {
			polyline.on('click', events.click)
		}
		return polyline
	})

	createPolylinesFx.use((poltygonsOptions) => {
		return Promise.all(
			poltygonsOptions.map(({ position, options, events }) =>
				createPolylineFx({
					position,
					options,
					events
				})
			)
		)
	})

	sample({
		clock: createPolylineFx.doneData,
		fn: (polyline) => {
			return { key: Math.random().toString(), value: polyline }
		},
		target: polylineSet
	})

	$polylines.on(polylineSet, (prevPolylines, { key, value }) => ({
		...prevPolylines,
		[key]: value
	}))

	addPolylineFx.use(({ map, polyline }) => {
		return polyline.addTo(map)
	})

	addPolylinesFx.use(({ map, polylines }) => {
		return Promise.all(polylines.map((polyline) => addPolylineFx({ map, polyline })))
	})

	removePolylineFx.use(({ polyline }) => {
		return polyline.remove()
	})

	removePolylinesFx.use(({ polylines }) => {
		return Promise.all(polylines.map((polyline) => removePolylineFx({ polyline })))
	})

	return {
		$polylines,
		createPolylineFx,
		createPolylinesFx,
		addPolylineFx,
		addPolylinesFx,
		removePolylineFx,
		removePolylinesFx
	}
})
