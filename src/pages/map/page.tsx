import { Box, Center, Container, Flex, Spinner, Stack, Text } from '@chakra-ui/react'
import { useUnit } from 'effector-react'
import 'leaflet-draw/dist/leaflet.draw.css'
import React from 'react'
import { FeatureGroup, Marker, Pane, Polygon, Tooltip, ZoomControl } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'

import { Header } from '~src/widgets/header'

import { LandsToLandFactory } from '~src/features/lands-to-land'

import { MapFactory } from '~src/entities/map'

import { lazy, zIndices } from '~src/shared/lib'

import * as model from './model'
import { Legend } from './legend'
import { cultureColors } from './lib'

const MapSidebar = lazy(() => import('./sidebar'), 'MapSidebar')
const MapToolbar = lazy(() => import('./toolbar'), 'MapToolbar')

export function MapPage() {
	const [handleMount, handleUnmount] = useUnit([model.mapPageMounted, model.mapPageUnmounted])
	const [mapPending] = useUnit([model.$mapPending])

	React.useEffect(() => {
		handleMount()
		return () => {
			handleUnmount()
		}
	}, [handleMount, handleUnmount])

	return (
		<Box>
			<Header />
			<Container
				display='flex'
				maxW='full'
				maxH='calc(100vh - 4rem)'
				minH='max(calc(100vh - 4rem), 30rem)'
				p='0'
				pos='relative'
			>
				<Flex minH='0' direction='row' flexGrow='1'>
					<MapSidebar minH='0' />
					<MapToolbar />

					<MapFactory.Map
						model={model.$$map}
						isResize
						zoomControl={false}
						containerProps={{ w: 'full', h: 'full', minH: '0', zIndex: zIndices.map }}
						style={{ width: '100%', height: '100%' }}
					>
						<MapDraw />
						<FilterClientsPlots />
						<RegionsOverlay />
						<Regions />
						<Districts />
						<ClientsLand />
						<ClientPlots />
						<ClientPoints />

						<ZoomControl position='bottomleft' />
					</MapFactory.Map>
				</Flex>

				<Legend />

				{mapPending && (
					<Center w='full' h='full' bg='blackAlpha.300' position='absolute' top='0' left='0' zIndex='sticky'>
						<Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />
					</Center>
				)}
			</Container>
		</Box>
	)
}

function MapDraw() {
	const [clientsLand, handleDrawCreate, handleDrawRemove] = useUnit([
		model.$$clientsLand.$clientsLand,
		model.$$clientsPlotsInCircle.handleCircleDraw,
		model.$$clientsPlotsInCircle.handleCircleRemove,
	])

	return (
		<FeatureGroup>
			{clientsLand.length !== 0 && (
				<EditControl
					position='topleft'
					onCreated={handleDrawCreate}
					onDeleted={handleDrawRemove}
					draw={{
						circle: true,
						circlemarker: false,
						polyline: false,
						polygon: false,
						rectangle: false,
						marker: false,
					}}
				/>
			)}
		</FeatureGroup>
	)
}

function FilterClientsPlots() {
	const [filterClientsPlots, handleClientLandClick] = useUnit([
		model.$$clientsPlotsInCircle.$circlesClientsPlots,
		model.$$clientsLandToClientLand.landClicked,
	])

	return (
		<Pane name='filter-clients-plots' style={{ zIndex: 308 }}>
			{filterClientsPlots.map((filterClientPlot, index) => (
				<Polygon
					key={index}
					pathOptions={{
						color: 'red',
					}}
					positions={filterClientPlot.geometryRings as any}
					eventHandlers={{
						click: () => {
							handleClientLandClick(filterClientPlot.clientId)
						},
					}}
				/>
			))}
		</Pane>
	)
}

function RegionsOverlay() {
	const [regionsOverlay] = useUnit([model.$$regionsOverlay.$regionsOverlay])

	return (
		<>
			<Pane name='regions-overlay' style={{ zIndex: 301 }}>
				{regionsOverlay.map((region, index) => (
					<Polygon
						key={index}
						pathOptions={{
							color: 'gray',
						}}
						positions={region.geometryRings as any}
					/>
				))}
			</Pane>
		</>
	)
}

function Regions() {
	return (
		<>
			<Pane name='regions' style={{ zIndex: 302 }}>
				<LandsToLandFactory.Lands model={model.$$regionsToRegion}>
					{({ land: region, onClick }) => (
						<Polygon
							pathOptions={{
								color: '#1CA4F8',
							}}
							positions={region.geometryRings as any}
							eventHandlers={{
								click: () => {
									onClick(region.id)
								},
							}}
						/>
					)}
				</LandsToLandFactory.Lands>
			</Pane>

			<Pane name='region' style={{ zIndex: 303 }}>
				<LandsToLandFactory.Land model={model.$$regionsToRegion}>
					{({ land: region }) => <Polygon pathOptions={{ color: 'white' }} positions={region.geometryRings as any} />}
				</LandsToLandFactory.Land>
			</Pane>
		</>
	)
}

function Districts() {
	return (
		<>
			<Pane name='districts' style={{ zIndex: 304 }}>
				<LandsToLandFactory.Lands model={model.$$districtsToDistrict}>
					{({ land: district, onClick }) => (
						<Polygon
							pathOptions={{
								color: 'white',
							}}
							positions={district.geometryRings as any}
							eventHandlers={{
								click: () => {
									onClick(district.id)
								},
							}}
						>
							<Tooltip opacity={0.8} direction='center'>
								Район:
								<Text>{district.name}</Text>
								{/* <Stack direction='row' align='center'>
									<Text fontSize='sm' fontWeight='bold'></Text>
								</Stack> */}
							</Tooltip>
						</Polygon>
					)}
				</LandsToLandFactory.Lands>
			</Pane>
			<Pane name='district' style={{ zIndex: 305 }}>
				<LandsToLandFactory.Land model={model.$$districtsToDistrict}>
					{({ land: district }) => (
						<Polygon pathOptions={{ color: 'white' }} positions={district.geometryRings as any} />
					)}
				</LandsToLandFactory.Land>
			</Pane>
		</>
	)
}

function ClientsLand() {
	const [isSeparate, clientsLandByCultures] = useUnit([
		model.$isClientsSeparate,
		model.$$clientsLand.$$clientsLandByCultures.$clientsLand,
	])

	return (
		<>
			<Pane name='clients-land' style={{ zIndex: 306 }}>
				<LandsToLandFactory.Lands model={model.$$clientsLandToClientLand}>
					{({ land: clientLand, onClick, index }) => (
						<Polygon
							pathOptions={{
								color: (() => {
									if (clientsLandByCultures[index]?.plotCultId) {
										const cultureId = clientsLandByCultures[index]!.plotCultId
										const bgColor = cultureColors[cultureId].bgColor ?? 'red'
										return bgColor
									} else {
										return isSeparate ? (clientLand.guid ? 'lightgreen' : 'yellow') : 'blue'
									}
								})(),
							}}
							positions={clientLand.geometryRings as any}
							eventHandlers={{
								click: () => {
									onClick(clientLand.clientId)
								},
							}}
						/>
					)}
				</LandsToLandFactory.Lands>
			</Pane>
			<Pane name='client-land' style={{ zIndex: 307 }}>
				<LandsToLandFactory.Land model={model.$$clientsLandToClientLand}>
					{({ land: clientLand }) => (
						<Polygon pathOptions={{ color: 'white' }} positions={clientLand.geometryRings as any} />
					)}
				</LandsToLandFactory.Land>
			</Pane>
		</>
	)
}

function ClientPlots() {
	return (
		<>
			<Pane name='client-plots' style={{ zIndex: 309 }}>
				<LandsToLandFactory.Lands model={model.$$clientPlotsToClientPlot}>
					{({ land: clientPlot, onClick }) => (
						<Polygon
							pathOptions={{
								color: 'black',
							}}
							positions={clientPlot.geometryRings as any}
							eventHandlers={{
								click: () => {
									onClick(clientPlot.plotId)
								},
							}}
						/>
					)}
				</LandsToLandFactory.Lands>
			</Pane>
			<Pane name='client-plot' style={{ zIndex: 310 }}>
				<LandsToLandFactory.Land model={model.$$clientPlotsToClientPlot}>
					{({ land: clientPlot }) => (
						<Polygon pathOptions={{ color: 'white' }} positions={clientPlot.geometryRings as any} />
					)}
				</LandsToLandFactory.Land>
			</Pane>
		</>
	)
}

function ClientPoints() {
	const [clientPoints] = useUnit([model.$$clientPoints.$clientPoints])

	return (
		<>
			<Pane name='client-points' style={{ zIndex: 311 }}>
				{clientPoints.map((clientPoint, index) => (
					<Marker key={index} position={clientPoint.coordinate as any}>
						<Tooltip sticky opacity={0.8} direction='bottom'>
							<Stack direction='row' align='center'>
								<Text fontSize='sm' fontWeight='bold'>
									Клиент:
								</Text>
								<Text>{clientPoint.name}</Text>
								<Text fontSize='sm' fontWeight='bold'>
									Категория:
								</Text>
								<Text>{clientPoint.category}</Text>
							</Stack>
						</Tooltip>
					</Marker>
				))}
			</Pane>
		</>
	)
}
