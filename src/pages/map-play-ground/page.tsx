export const kek = ''
// import { Box, Center, Container, Flex, Spinner } from '@chakra-ui/react'
// import { useUnit } from 'effector-react'
// import React from 'react'
// import { Pane, Polygon, type PolygonProps } from 'react-leaflet'

// import { Header } from '~src/widgets/header'

// import { MapFactory } from '~src/entities/map'

// import { zIndices } from '~src/shared/lib'

// import * as model from './model'
// import { MapPlayGroundSidebar } from './sidebar'

// export const MapPlayGroundPage = () => {
// 	const [handleMount, handleUnmount] = useUnit([model.mapPageMounted, model.mapPageUnmounted])
// 	const [pagePending] = useUnit([model.$mapPagePending])

// 	React.useEffect(() => {
// 		handleMount()

// 		return () => {
// 			handleUnmount()
// 		}
// 	}, [])

// 	return (
// 		<Box>
// 			<Header />
// 			<Container maxW='full' minH='calc(100vh - 4rem)' p='0' position='relative' overflow='hidden'>
// 				<Flex minH='inherit' direction='row'>
// 					<MapPlayGroundSidebar minH='md' />

// 					<Box model={model.mapModel} isResize as={MapFactory.Map} minH='inherit' zIndex={zIndices.map}>
// 						<Pane name='regions-overlay' style={{ zIndex: 301 }}>
// 							<RegionsOverlay pathOptions={{ color: 'blackAlpha' }} />
// 						</Pane>
// 						<Pane name='regions' style={{ zIndex: 302 }}>
// 							<Regions pathOptions={{ color: '#1CA4F8' }} />
// 						</Pane>
// 						<Pane name='districts' style={{ zIndex: 303 }}>
// 							<Districts pathOptions={{ color: 'red' }} />
// 						</Pane>
// 						<Pane name='clients-plots' style={{ zIndex: 304 }}>
// 							<ClientsPlots pathOptions={{ color: 'white' }} />
// 						</Pane>
// 						<Pane name='client-plots' style={{ zIndex: 304 }}>
// 							<ClientPlots pathOptions={{ color: 'white' }} />
// 						</Pane>
// 						<Pane name='client-plot' style={{ zIndex: 304 }}>
// 							<ClientPlot pathOptions={{ color: 'white' }} />
// 						</Pane>
// 						<Pane name='filter-clients-plots' style={{ zIndex: 304 }}>
// 							<FilterClientsPlots pathOptions={{ color: 'white' }} />
// 						</Pane>
// 					</Box>
// 				</Flex>

// 				{pagePending && (
// 					<Center
// 						w='full'
// 						h='full'
// 						position='absolute'
// 						top='50%'
// 						left='50%'
// 						transform='translateX(-50%) translateY(-50%)'
// 						zIndex='overlay'
// 						bgColor='blackAlpha.400'
// 					>
// 						<Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />
// 					</Center>
// 				)}
// 			</Container>
// 		</Box>
// 	)
// }

// function RegionsOverlay(props: Omit<PolygonProps, 'positions'>) {
// 	const [regionsOverlay] = useUnit([model.regionsOverlayModel.$overlayRegions])

// 	return (
// 		<>
// 			{regionsOverlay.map((regionOverlay, index) => (
// 				<Polygon key={index} positions={regionOverlay.geometry_rings as any} {...props} />
// 			))}
// 		</>
// 	)
// }

// function Regions(props: Omit<PolygonProps, 'positions'>) {
// 	const [regions, handleRegionClick] = useUnit([model.regionsModel.$regions, model.regionModel.regionSettled])

// 	return (
// 		<>
// 			{regions.map((region, index) => (
// 				<Polygon
// 					key={index}
// 					positions={region.geometry_rings as any}
// 					eventHandlers={{
// 						click: () => {
// 							handleRegionClick(region.regionId)
// 						},
// 					}}
// 					{...props}
// 				/>
// 			))}
// 		</>
// 	)
// }

// function Districts(props: Omit<PolygonProps, 'positions'>) {
// 	const [districts] = useUnit([model.districtsModel.$districts])

// 	return (
// 		<>
// 			{districts.map((district, index) => (
// 				<Polygon key={index} positions={district.geometry_rings as any} {...props} />
// 			))}
// 		</>
// 	)
// }

// function ClientsPlots(props: Omit<PolygonProps, 'positions'>) {
// 	const [clientsPlots] = useUnit([model.clientsPlotsModel.$clientsPlots])

// 	return (
// 		<>
// 			{clientsPlots.map((clientPlot, index) => (
// 				<Polygon key={index} positions={clientPlot.geometry_rings as any} {...props} />
// 			))}
// 		</>
// 	)
// }

// function ClientPlots(props: Omit<PolygonProps, 'positions'>) {
// 	const [clientPlots] = useUnit([model.clientPlotsModel.$clientPlots])

// 	return (
// 		<>
// 			{clientPlots.map((clientPlot, index) => (
// 				<Polygon key={index} positions={clientPlot.geometry_rings as any} {...props} />
// 			))}
// 		</>
// 	)
// }

// function ClientPlot(props: Omit<PolygonProps, 'positions'>) {
// 	const [clientPlot] = useUnit([model.clientPlotModel.$clientPlot])

// 	if (!clientPlot) return null

// 	return <Polygon positions={clientPlot.geometry_rings as any} {...props} />
// }

// function FilterClientsPlots(props: Omit<PolygonProps, 'positions'>) {
// 	const [filterClientsPlots] = useUnit([model.filterClientsPlotsModel.$filterClientsPlots])

// 	return (
// 		<>
// 			{filterClientsPlots.map((filterClientPlot, index) => (
// 				<>
// 					{filterClientPlot.clientsPlots.map((plot) => (
// 						<Polygon key={index} positions={plot.geometry_rings as any} {...props} />
// 					))}
// 				</>
// 			))}
// 		</>
// 	)
// }
