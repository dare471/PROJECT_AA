import { useUnit } from 'effector-react'
import { useEvent } from 'effector-react/effector-react.umd'
import 'leaflet/dist/leaflet.css'
import { MapContainer as _MapContainer, TileLayer } from 'react-leaflet'
import styled from 'styled-components'

import { mapModel } from '~src/entities/map'

export function Map() {
	const { position, zoom } = useUnit({ position: mapModel.$mapPosition, zoom: mapModel.$mapZoom })
	const handleMapControl = useEvent(mapModel.mapMounted)

	return (
		<Container>
			<MapContainer
				center={position}
				zoom={zoom}
				scrollWheelZoom={false}
				ref={handleMapControl}
				zoomControl
				attributionControl
			>
				<TileLayer
					attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
					url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
					subdomains='abcd'
				/>
			</MapContainer>
		</Container>
	)
}

const Container = styled.div`
	flex: 0 1 auto;
	width: 100%;
	height: 100%;

	position: relative;
`

const MapContainer = styled(_MapContainer)`
	width: 100%;
	height: 100%;
	outline: none;
`
