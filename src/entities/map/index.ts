import { mapFactory } from './map-model'
import {
	BoundsToggle,
	Map,
	Marker,
	Polygon,
	Polyline,
	PreviewBounds,
	PreviewCenter,
	PreviewZoom
} from './molecules'

export * as mapModel from './model'

export const CreateMap = {
	Map,
	PreviewCenter,
	PreviewZoom,
	PreviewBounds,
	BoundsToggle,
	Polyline,
	Polygon,
	Marker,
	mapFactory
}
