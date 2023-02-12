import { Box } from '@chakra-ui/react'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer } from 'react-leaflet'

import { Header } from '~src/widgets/header'

import { zIndices } from '~src/shared/lib'

import * as model from './model'

export const MAP_ATTRIBUTION =
	'&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
export const MAP_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png'

export function MapPage() {
	return (
		<Box>
			<Header />
			<Box minH='calc(100vh - 4rem)'>
				<Box as={MapContainer} h='full' minH='inherit' zIndex={zIndices.map} center={model.CENTER} zoom={model.ZOOM}>
					<TileLayer attribution={MAP_ATTRIBUTION} url={MAP_URL} />
				</Box>
			</Box>
		</Box>
	)
}
