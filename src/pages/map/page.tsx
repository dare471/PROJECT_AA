import { Box, Flex } from '@chakra-ui/react'
import { useUnit } from 'effector-react'
import 'leaflet-draw/dist/leaflet.draw.css'
import 'leaflet/dist/leaflet.css'
import React from 'react'
import { FeatureGroup, MapContainer, Pane, Polygon, Polyline, TileLayer } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'
import { useResizeDetector } from 'react-resize-detector'

import { Header } from '~src/widgets/header'

import { OverlaySpinner } from '~src/shared/ui'

import * as model from './model'
import { MapSidebar } from './sidebar'
import { MapToolbar } from './toolbar'

export const MAP_ATTRIBUTION =
	'&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
export const MAP_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png'

export function MapPage() {
	const [handleMount, handleUnmount] = useUnit([model.mapPageMounted, model.mapPageUnmounted])
	const [mapPending] = useUnit([model.$mapPending])
	const [activeLand] = useUnit([model.$activeLand])

	React.useEffect(() => {
		handleMount()

		return () => {
			handleUnmount()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<Box>
			<Header />
			<Box maxW='100vw' overflowX='hidden' position='relative' minH='calc(100vh - 4rem)'>
				<Flex minH='inherit' direction='row'>
					<Box position='absolute' top='0' left='20' zIndex='dropdown'>
						{activeLand.country
							? 'Страна'
							: activeLand.region
							? 'Регион'
							: activeLand.district
							? 'Район'
							: activeLand.client
							? 'Клиент'
							: activeLand.clientPlot
							? 'Участок'
							: null}
					</Box>
					<MapSidebar minH='md' />
					<MapToolbar />

					<CustomMap />
				</Flex>

				{mapPending && <OverlaySpinner />}
			</Box>
		</Box>
	)
}

function CustomMap(props: any) {
	const [map, handleMapMount] = useUnit([model.$map, model.mapMounted])
	const [regionsOverlay] = useUnit([model.$regionsOverlay])
	const [regions, region, handleRegionClick] = useUnit([model.$regions, model.$region, model.regionSettled])
	const [districts, isDistrictsView, district, handleDistrictClick] = useUnit([
		model.$districts,
		model.$isDistrictsView,
		model.$district,
		model.districtSettled,
	])
	const [clientsPlots, isClientsPlotsGuidView, client, handleClientClick] = useUnit([
		model.$clientsPlots,
		model.$isClientsPlotsGuidView,
		model.$client,
		model.clientSettled,
	])
	const [clientPlots, clientPlot, handleClientPlotClick] = useUnit([
		model.$clientPlots,
		model.$clientPlot,
		model.clientPlotSettled,
	])
	const [filterPlots, handleCircleDraw, handleCircleDelete] = useUnit([
		model.$filterPlots,
		model.circleDrawn,
		model.circleDeleted,
	])

	const { width, height, ref } = useResizeDetector()

	React.useEffect(() => {
		if (!map) return
		map.invalidateSize()
	}, [width, height])

	return (
		<Box w='full' minH='inherit' position='relative' ref={ref}>
			<Box
				as={MapContainer}
				ref={handleMapMount as any}
				h='full'
				minH='md'
				w='full'
				position='absolute'
				top='0'
				left='0'
				zIndex='map'
				width={width}
				height={height}
				center={model.CENTER}
				zoom={model.ZOOM}
				{...props}
			>
				<TileLayer attribution={MAP_ATTRIBUTION} url={MAP_URL} />
				<FeatureGroup>
					<EditControl
						position='bottomright'
						draw={{
							circle: true,
							circlemarker: false,
							marker: false,
							polygon: false,
							polyline: false,
							rectangle: false,
						}}
						onCreated={(e) => handleCircleDraw(e)}
						onDeleted={(e) => handleCircleDelete(e)}
					/>
				</FeatureGroup>

				<Pane name='regions-overlay' style={{ zIndex: 301 }}>
					{regionsOverlay.map((regionOverlay, index) => (
						<Polygon key={index} positions={regionOverlay.geometry_rings as any} pathOptions={{ color: 'darkgray' }} />
					))}
				</Pane>

				<Pane name='regions' style={{ zIndex: 302 }}>
					{regions.map((region, index) => (
						<Polygon
							key={index}
							positions={region.geometry_rings as any}
							pathOptions={{ color: '#1CA4F8' }}
							eventHandlers={{
								click: () => {
									handleRegionClick(Number(region.id))
								},
							}}
						/>
					))}
				</Pane>
				<Pane name='region' style={{ zIndex: 303 }}>
					{region && <Polyline positions={region.geometry_rings as any} pathOptions={{ color: 'white' }} />}
				</Pane>

				<Pane name='districts' style={{ zIndex: 304 }}>
					{isDistrictsView &&
						districts.map((district, index) => (
							<Polyline key={index} positions={district.geometry_rings as any} pathOptions={{ color: '#006cb0' }} />
						))}
				</Pane>

				{
					<Pane name='clientsPlots' style={{ zIndex: 305 }}>
						{clientsPlots.map((clientPlot, index) => (
							<Polygon
								key={index}
								positions={clientPlot.geometry_rings as any}
								pathOptions={{
									color: isClientsPlotsGuidView ? (clientPlot.guid ? 'lightgreen' : 'yellow') : 'white',
								}}
								eventHandlers={{
									click: () => {
										handleClientClick(Number(clientPlot.clientId))
									},
								}}
							/>
						))}
					</Pane>
				}
				<Pane name='client' style={{ zIndex: 306 }}>
					{client &&
						clientPlots.map((plot, index) => (
							<Polyline key={index} positions={plot.geometry_rings as any} pathOptions={{ color: 'purple' }} />
						))}
				</Pane>

				<Pane name='client-plots' style={{ zIndex: 307 }}>
					{clientPlots.map((plot, index) => (
						<Polygon
							key={index}
							positions={plot.geometry_rings as any}
							pathOptions={{ color: 'black' }}
							eventHandlers={{
								click: () => {
									handleClientPlotClick(plot.plotId)
								},
							}}
						/>
					))}
				</Pane>
				<Pane name='filtered-client-plots'>
					{filterPlots.map((client, index) => (
						<React.Fragment key={index}>
							{client.plots.map((plot, index) => (
								<Polygon key={index} positions={plot.geometry_rings as any} pathOptions={{ color: 'red' }} />
							))}
						</React.Fragment>
					))}
				</Pane>

				<Pane name='client-plot' style={{ zIndex: 308 }}>
					{clientPlot && <Polyline positions={clientPlot.geometry_rings as any} pathOptions={{ color: 'white' }} />}
				</Pane>
			</Box>
		</Box>
	)
}
