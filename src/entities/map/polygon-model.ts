import { createEffect, createStore } from 'effector'
import { modelFactory } from 'effector-factorio'
import {
	LatLngExpression,
	LeafletMouseEvent,
	polygon as leafletPolygon,
	Map,
	Polygon,
	PolylineOptions
} from 'leaflet'

export interface LeafletPolygon {
	key: string
	value: Polygon
}

export type LeafletPolygonLatLng =
	| LatLngExpression[]
	| LatLngExpression[][]
	| LatLngExpression[][][]

export interface PolygonEvents {
	click?: (e: LeafletMouseEvent) => void
}

interface PolygonFactoryOptions {}

export const polygonFactory = modelFactory(function polygonFactory(options: PolygonFactoryOptions) {
	const createPolygonFx = createEffect<
		{
			position: LeafletPolygonLatLng
			options?: PolylineOptions
			events?: PolygonEvents
		},
		Polygon
	>()
	const addPolygonFx = createEffect<{ map: Map; polygon: Polygon }, Polygon>()
	const removePolygonFx = createEffect<{ polygon: Polygon }, Polygon>()

	const createPolygonsFx = createEffect<
		{
			position: LeafletPolygonLatLng
			options?: PolylineOptions
			events?: PolygonEvents
		}[],
		Polygon[]
	>()
	const addPolygonsFx = createEffect<{ map: Map; polygons: Polygon[] }, Polygon[]>()
	const removePolygonsFx = createEffect<{ polygons: Polygon[] }, Polygon[]>()

	const $polygons = createStore<LeafletPolygon[]>([])

	createPolygonFx.use(({ position, options, events }) => {
		const polygon = leafletPolygon(position, options)
		if (events?.click) {
			polygon.on('click', events.click)
		}
		return polygon
	})

	createPolygonsFx.use((poltygonsOptions) => {
		return Promise.all(
			poltygonsOptions.map(({ position, options, events }) =>
				createPolygonFx({
					position,
					options,
					events
				})
			)
		)
	})

	addPolygonFx.use(({ map, polygon }) => {
		return polygon.addTo(map)
	})

	addPolygonsFx.use(({ map, polygons }) => {
		return Promise.all(polygons.map((polygon) => addPolygonFx({ map, polygon })))
	})

	removePolygonFx.use(({ polygon }) => {
		return polygon.remove()
	})

	removePolygonsFx.use(({ polygons }) => {
		return Promise.all(polygons.map((polygon) => removePolygonFx({ polygon })))
	})

	return {
		$polygons,
		createPolygonFx,
		createPolygonsFx,
		addPolygonFx,
		addPolygonsFx,
		removePolygonFx,
		removePolygonsFx
	}
})
