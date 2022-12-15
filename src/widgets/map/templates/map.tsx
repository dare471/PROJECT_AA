import { useEvent } from 'effector-react'
import type { Map as TMap } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useCallback, useEffect, useState } from 'react'
import { MapContainer as _MapContainer, TileLayer, ZoomControl } from 'react-leaflet'
import styled from 'styled-components'

import { MapContent } from '~src/widgets/map/organisms'

// import {
// 	ClientsLandPolygon,
// 	DistrictLandPolygon,
// 	DistrictsLandPolygon,
// 	RegionLandPolygon,
// 	RegionsLandPolygon
// } from '~src/features/land/polygon'
import { mapModel } from '~src/entities/map'

import * as model from '../model'
import { MAP_ATTRIBUTION, MAP_URL } from '../lib'

export const Map = () => {
	const handleMapMounted = useEvent(model.mapMounted)
	const [mapControl, setMapControl] = useState<TMap | null>(null)

	const onMove = useCallback(() => {
		if (!mapControl) return

		const { lat: x, lng: y } = mapControl.getCenter()
		model.mapMoved({ x, y })
	}, [mapControl])

	const onZoom = useCallback(() => {
		if (!mapControl) return

		const zoom = mapControl.getZoom()
		model.mapZoomed(zoom)
	}, [mapControl])

	useEffect(() => {
		if (!mapControl) return

		handleMapMounted(mapControl)
		mapControl.on('move', onMove)
		mapControl.on('zoom', onZoom)

		return () => {
			mapControl.off('move', onMove)
			mapControl.off('zoom', onZoom)
		}
	}, [mapControl])

	return (
		<Container>
			<MapContainer
				center={[mapModel.POSITION_X, mapModel.POSITION_Y]}
				zoom={mapModel.ZOOM}
				scrollWheelZoom={false}
				ref={setMapControl}
				zoomControl={false}
				attributionControl={false}
			>
				<TileLayer attribution={MAP_ATTRIBUTION} url={MAP_URL} />

				<MapContent />

				{/*<Pane name='regions' style={{ zIndex: 400 }}>*/}
				{/*	<RegionsLandPolygon />*/}
				{/*</Pane>*/}
				{/*<Pane name='region' style={{ zIndex: 1000 }}>*/}
				{/*	<RegionLandPolygon />*/}
				{/*</Pane>*/}
				{/*<Pane name='districts' style={{ zIndex: 500 }}>*/}
				{/*	<DistrictsLandPolygon />*/}
				{/*</Pane>*/}
				{/*<Pane name='district' style={{ zIndex: 1500 }}>*/}
				{/*	<DistrictLandPolygon />*/}
				{/*</Pane>*/}

				{/*<Pane name='clients' style={{ zIndex: 1500 }}>*/}
				{/*	<ClientsLandPolygon />*/}
				{/*</Pane>*/}

				<ZoomControl zoomInText='+' zoomOutText='-' />
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
