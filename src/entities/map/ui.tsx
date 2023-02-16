import { Box, type BoxProps } from '@chakra-ui/react'
import { useUnit } from 'effector-react'
import 'leaflet/dist/leaflet.css'
import React from 'react'
import { MapContainer, type MapContainerProps, TileLayer } from 'react-leaflet'
import { useResizeDetector } from 'react-resize-detector'

import { type createMap } from './model'

interface MapProps extends Omit<MapContainerProps, 'center' | 'zoom'> {
	model: ReturnType<typeof createMap>
	isDetect: boolean
	center?: L.LatLngTuple
	zoom?: number
	containerProps?: BoxProps
	attribution?: string
	url?: string
}

export const CENTER = [48.356, 66.687] as L.LatLngTuple
export const ZOOM = 5
export const MAP_ATTRIBUTION =
	'&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
export const MAP_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png'

export function Map(props: MapProps) {
	const {
		model,
		isDetect,
		center = CENTER,
		zoom = ZOOM,
		attribution = MAP_ATTRIBUTION,
		url = MAP_URL,
		containerProps,
		children,
	} = props
	const [map, handleMount] = useUnit([model.$map, model.mapMounted])

	if (isDetect) {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const { width, height, ref } = useResizeDetector()

		// eslint-disable-next-line react-hooks/rules-of-hooks
		React.useEffect(() => {
			if (!map) return
			map.invalidateSize()
		}, [width, height])

		return (
			<Box w='full' minH='inherit' position='relative' ref={ref} {...containerProps}>
				<MapContainer ref={handleMount} center={center} zoom={zoom} style={{ width, height }} {...props}>
					{children}
				</MapContainer>
			</Box>
		)
	} else {
		return (
			<Box w='full' minH='inherit' position='relative' {...containerProps}>
				<MapContainer ref={handleMount} center={center} zoom={zoom} {...props}>
					<TileLayer attribution={attribution} url={url} />
					{children}
				</MapContainer>
			</Box>
		)
	}
}
