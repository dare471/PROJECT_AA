//FIXME: Refactor map-map-model.ts to map-model.ts
import { createEffect, createEvent, createStore, sample } from 'effector'
import { modelFactory } from 'effector-factorio'
import type {
	LatLngLiteral,
	LatLngTuple,
	LeafletEvent,
	LeafletMouseEvent,
	Map,
	MapOptions,
	ZoomPanOptions
} from 'leaflet'
import { LatLngBounds, Map as LeafletMap, tileLayer as LeafletTileLayer } from 'leaflet'

import { markerFactory } from '~src/entities/map/marker-model'
import { polygonFactory } from '~src/entities/map/polygon-model'
import { polylineFactory } from '~src/entities/map/polyline-model'

export interface PolygonEvents {
	click?: (e: LeafletMouseEvent) => void
}

export interface PolylineEvents {
	click?: (e: LeafletMouseEvent) => void
}

//TODO: If we need, we can add other observe options
interface MapParams extends MapOptions {
	tileLayer: string
	center: LatLngTuple
	zoom: number
	observeMove?: boolean
	observeZoom?: boolean
}

// In this case we are use [lat, lng] = [y, x]
export const mapFactory = modelFactory(function mapFactory(options: MapParams) {
	const {
		$polygons,
		createPolygonFx,
		createPolygonsFx,
		addPolygonFx,
		addPolygonsFx,
		removePolygonFx,
		removePolygonsFx
	} = polygonFactory.createModel({})
	const {
		$polylines,
		createPolylineFx,
		createPolylinesFx,
		addPolylineFx,
		addPolylinesFx,
		removePolylineFx,
		removePolylinesFx
	} = polylineFactory.createModel({})
	const { $markers, createMarkerFx, addMarkerFx, removeMarkerFx } = markerFactory.createModel({})

	const mapMounted = createEvent<HTMLDivElement>()
	const mapUnMounted = createEvent<void>()

	const mapMoved = createEvent<LeafletEvent>()
	const mapZoomed = createEvent<LeafletEvent>()

	const boundsSet = createEvent<LatLngBounds>()
	const currentBoundsSet = createEvent<void>()
	const boundsRemove = createEvent<void>()

	const viewSet = createEvent<{
		lat?: number
		lng?: number
		zoom?: number
		options?: ZoomPanOptions
	}>()
	const flyToSet = createEvent<{
		lat?: number
		lng?: number
		zoom?: number
		options?: ZoomPanOptions
	}>()

	const createMapFx = createEffect<{ node: HTMLDivElement }, Map>()
	const observeMapFx = createEffect<{ map: Map }, void>()
	const unobserveMapFx = createEffect<{ map: Map }, void>()

	const setViewFx = createEffect<
		{ map: Map; center: LatLngTuple; zoom: number; options?: ZoomPanOptions },
		void
	>()
	const setFlyToFx = createEffect<
		{ map: Map; center: LatLngTuple; zoom: number; options?: ZoomPanOptions },
		void
	>()
	const setBoundsFx = createEffect<{ map: Map; bounds: LatLngBounds }, LatLngBounds>()

	const $map = createStore<Map | null>(null)
	const $previewCenter = createStore<LatLngLiteral>({
		lat: options.center[0],
		lng: options.center[1]
	})
	const $previewZoom = createStore<number>(options.zoom)
	const $previewBounds = createStore<LatLngBounds | null>(null)

	sample({
		clock: mapMounted,
		fn: (node) => ({ node }),
		target: createMapFx
	})

	createMapFx.use(async ({ node }) => {
		const map = new LeafletMap(node, options)

		if (options.tileLayer) {
			const tileLayer = LeafletTileLayer(options.tileLayer)
			tileLayer.addTo(map)
		}
		return map
	})

	sample({
		clock: createMapFx.doneData,
		target: $map
	})

	sample({
		clock: $map,
		filter: (map: Map | null): map is Map => Boolean(map),
		fn: (map) => ({ map }),
		target: observeMapFx
	})

	observeMapFx.use(({ map }) => {
		if (options.observeMove) {
			map.on('move', mapMoved)
		}
		if (options.observeZoom) {
			map.on('zoom', mapZoomed)
		}
	})

	sample({
		clock: mapMoved,
		fn: (move) => {
			const { currentCenterLat, currentCenterLng } = getMapCharacteristics(move.target)
			return { lat: currentCenterLat, lng: currentCenterLng }
		},
		target: $previewCenter
	})

	sample({
		clock: mapZoomed,
		fn: (move) => {
			const { currentZoom } = getMapCharacteristics(move.target)
			return currentZoom
		},
		target: $previewZoom
	})

	sample({
		clock: viewSet,
		source: $map,
		filter: (map: Map | null): map is Map => Boolean(map),
		fn: (map, { lat: nextCenterLat, lng: nextCenterLng, zoom: nextZoom, options }) => {
			const { currentCenterLat, currentCenterLng, currentZoom } = getMapCharacteristics(map)
			const centerLat = nextCenterLat ?? currentCenterLat
			const centerLng = nextCenterLng ?? currentCenterLng
			const center = [centerLat, centerLng] as LatLngTuple
			const zoom = nextZoom ?? currentZoom

			return { map, center, zoom, options }
		},
		target: setViewFx
	})

	setViewFx.use(({ map, center, zoom, options }) => {
		map.setView(center, zoom)
	})

	sample({
		clock: flyToSet,
		source: $map,
		filter: (map: Map | null): map is Map => Boolean(map),
		fn: (map, { lat: nextCenterLat, lng: nextCenterLng, zoom: nextZoom, options }) => {
			const { currentCenterLat, currentCenterLng, currentZoom } = getMapCharacteristics(map)
			const centerLat = nextCenterLat ?? currentCenterLat
			const centerLng = nextCenterLng ?? currentCenterLng
			const center = [centerLat, centerLng] as LatLngTuple
			const zoom = nextZoom ?? currentZoom

			return { map, center, zoom, options }
		},
		target: setFlyToFx
	})

	setFlyToFx.use(({ map, center, zoom, options }) => {
		map.flyTo(center, zoom, options)
	})

	sample({
		clock: currentBoundsSet,
		source: $map,
		filter: (map: Map | null): map is Map => Boolean(map),
		fn: (map) => map.getBounds(),
		target: boundsSet
	})

	sample({
		clock: boundsSet,
		source: $map,
		filter: (map: Map | null): map is Map => Boolean(map),
		fn: (map, bounds) => ({
			map,
			bounds
		}),
		target: setBoundsFx
	})

	sample({
		clock: boundsRemove,
		source: $map,
		filter: (map: Map | null): map is Map => Boolean(map),
		fn: (map) => ({ map, bounds: [] as any }),
		target: setBoundsFx
	})

	setBoundsFx.use(({ map, bounds }) => {
		map.setMaxBounds(bounds)
		return bounds
	})

	sample({
		clock: boundsSet,
		target: $previewBounds
	})

	$previewBounds.reset(boundsRemove)

	sample({
		clock: mapUnMounted,
		source: $map,
		filter: (map: Map | null): map is Map => Boolean(map),
		fn: (map) => ({ map }),
		target: [unobserveMapFx, $map.reinit!]
	})

	unobserveMapFx.use(({ map }) => {
		map.off('move', mapMoved)
		map.off('zoom', mapZoomed)
	})

	return {
		mapMounted,
		mapUnMounted,
		$map,
		$previewCenter,
		$previewZoom,
		$previewBounds,
		$polygons,
		createPolygonFx,
		createPolygonsFx,
		addPolygonFx,
		addPolygonsFx,
		removePolygonFx,
		removePolygonsFx,
		$polylines,
		createPolylineFx,
		createPolylinesFx,
		addPolylineFx,
		addPolylinesFx,
		removePolylineFx,
		removePolylinesFx,
		$markers,
		createMarkerFx,
		addMarkerFx,
		removeMarkerFx,
		boundsSet,
		currentBoundsSet,
		boundsRemove,
		viewSet,
		flyToSet
	}
})

function getMapCharacteristics(map: Map) {
	const { lat: currentCenterLat, lng: currentCenterLng } = map.getCenter()
	const currentZoom = map.getZoom()

	return { currentCenterLat, currentCenterLng, currentZoom }
}
