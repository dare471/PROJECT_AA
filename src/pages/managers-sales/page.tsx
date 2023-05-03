import {
	Box,
	Button,
	Card,
	CardBody,
	Center,
	CircularProgress,
	Container,
	Grid,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Progress,
	Spinner,
	Stack,
	Text,
} from '@chakra-ui/react'
import DOMPurify from 'dompurify'
import { useUnit } from 'effector-react'
import { divIcon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import React, { Fragment, useState } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MapContainer, Marker, Polyline, Popup, TileLayer, Tooltip, useMap, useMapEvent } from 'react-leaflet'

import { Header } from '~src/widgets/header'

import type { Country, ManagersFromToManager } from '~src/shared/api'
import { AirplaneSvg } from '~src/shared/assets'
import { TableFactory } from '~src/shared/ui'

import * as model from './model'
import { randomDarkHsl } from './model'

const countriesLatLng = {
	asia: { latitude: 35.6895, longitude: 75.6917 },
	africa: { latitude: 15.3694, longitude: 28.3228 },
	europe: { latitude: 48.8566, longitude: 2.3522 },
	usa: { latitude: 38.9072, longitude: -77.0369 },
	antarctica: { latitude: -75, longitude: 75 },
	australia: { latitude: -35.282, longitude: 149.1287 },
}

export function ManagersSalesPage() {
	const [onMount, onUnMount] = useUnit([model.managersPageMounted, model.managersPageUnMounted])
	const [currentManagerFromTo, countriesPending] = useUnit([model.$currentManagerFromTo, model.$managersFromToPending])
	const [managersSalesResult, managersSalesResultPending] = useUnit([
		model.$managersSalesResult,
		model.$managersSalesResultPending,
	])

	React.useEffect(() => {
		onMount()
		return () => {
			onUnMount()
		}
	}, [])

	return (
		<Box>
			<Header />
			<Container
				display='flex'
				flexDirection={{ base: 'column', md: 'row' }}
				maxW='full'
				minH='max(calc(100vh - 4rem), 30rem)'
				p='0'
				pos='relative'
			>
				<Box
					display='flex'
					flexDirection='column'
					width={{ base: '100%', md: '70%' }}
					height='calc(100vh - 4rem)'
					borderRadius='0 1rem 1rem 0'
				>
					<Box padding='30px 10px'>
						{managersSalesResultPending ? (
							<Center>
								<Spinner />
							</Center>
						) : (
							<Stack>
								<Text
									fontSize='xl'
									dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(managersSalesResult?.title ?? '') }}
								/>
								<Progress size='lg' borderRadius='xl' value={Number(managersSalesResult?.progress) ?? 0} />
								<Stack direction='row' justify='space-between'>
									<div>{managersSalesResult?.actualSum}</div>
									<div>{managersSalesResult?.planSum}</div>
								</Stack>
							</Stack>
						)}
					</Box>
					<MapContainer
						center={[0, 50]}
						zoom={2}
						style={{ width: '100%', height: '100%', borderRadius: 'inherit' }}
						// maxZoom={3}
						minZoom={2}
						boxZoom={false}
						doubleClickZoom={false}
						// dragging={false}
						keyboard={false}
						maxBounds={[
							[-90, -180],
							[90, 180],
						]}
					>
						<TileLayer
							url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						/>
						<Example />
					</MapContainer>
				</Box>
				<Grid width={{ base: '100%', md: '30%' }} height='calc(100vh - 4rem)' padding='5' templateRows={'1fr auto'}>
					{countriesPending ? (
						<Center height='full'>
							<Spinner />
						</Center>
					) : (
						<Stack minHeight='0'>
							<Text fontSize='xl'>Менеджеры</Text>
							{currentManagerFromTo && (
								<Stack overflowY='auto' minHeight='0'>
									{currentManagerFromTo.managers.map((manager, index) => (
										<Card key={index} variant='outline'>
											<CardBody>
												<Stack direction='row' justify='space-between' align='center' flexWrap='wrap'>
													<Stack direction='row' align='center'>
														<span
															style={{
																width: '10px',
																height: '10px',
																backgroundColor: manager.color,
																borderRadius: '50%',
																display: 'inline-block',
															}}
														/>
														<span>{manager.user}</span>
													</Stack>

													<Stack direction='row'>
														<span>Очки:</span>
														<span>{manager.score}</span>
													</Stack>
													<Stack direction='row'>
														<span>Место:</span>
														<span>{manager.rank}</span>
													</Stack>
												</Stack>
											</CardBody>
										</Card>
									))}
								</Stack>
							)}
						</Stack>
					)}
					<Button colorScheme='blue' onClick={() => model.$$modals.modalOpenClicked({ modalName: 'allUsers' })}>
						Все пользователи
					</Button>
				</Grid>
			</Container>
			<AllUsersModal />
		</Box>
	)
}

function AllUsersModal() {
	const [allManagers, allManagersPending] = useUnit([model.$allManagers, model.$allManagersPending])
	const [modals, onModalClose] = useUnit([model.$$modals.$modalsState, model.$$modals.modalCloseClicked])

	return (
		<Modal size='5xl' isOpen={modals.allUsers} onClose={() => onModalClose({ modalName: 'allUsers' })}>
			<ModalOverlay />
			<ModalContent>
				<ModalBody>
					<ModalHeader>
						<Text fontSize='xl'>Все пользователи</Text>
					</ModalHeader>
					{allManagersPending ? (
						<Center padding='10'>
							<Spinner />
						</Center>
					) : (
						<Stack>
							<TableFactory.Table>
								<TableFactory.THead>
									<TableFactory.Tr>
										<TableFactory.Th>Пользователь</TableFactory.Th>
										<TableFactory.Th>Место</TableFactory.Th>
										<TableFactory.Th>Очки</TableFactory.Th>
										<TableFactory.Th>Сумма</TableFactory.Th>
										<TableFactory.Th>Клиенты</TableFactory.Th>
									</TableFactory.Tr>
								</TableFactory.THead>
								<TableFactory.TBody columnLength={4} empty={{ empty: false }}>
									{allManagers?.map((manager, index) => (
										<TableFactory.Tr key={index}>
											<TableFactory.Td>{manager.user}</TableFactory.Td>
											<TableFactory.Td>{manager.rank}</TableFactory.Td>
											<TableFactory.Td>{manager.score}</TableFactory.Td>
											<TableFactory.Td>{manager.sumMoney}</TableFactory.Td>
											<TableFactory.Td>{manager.newClient}</TableFactory.Td>
										</TableFactory.Tr>
									))}
								</TableFactory.TBody>
							</TableFactory.Table>
						</Stack>
					)}
					<ModalFooter>
						<Button colorScheme='blue' onClick={() => model.$$modals.modalCloseClicked({ modalName: 'allUsers' })}>
							Закрыть
						</Button>
					</ModalFooter>
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}

function Example() {
	const [selectManager, setSelectManager] = useState<ManagersFromToManager | null>(null)
	const [managersFromTo, currentManagerFromTo] = useUnit([model.$managersFromTo, model.$currentManagerFromTo])
	const [isAirplaneCluster, onAirplaneClusterClick] = useUnit([model.$isAirplaneCluster, model.airplaneClusterClicked])
	useMapEvent('zoom', (e) => {
		if (e.target.getZoom() > 3) {
			onAirplaneClusterClick(false)
		} else {
			onAirplaneClusterClick(true)
		}
	})

	const map = useMap()

	const level1AirplaneIcon = divIcon({
		html: renderToStaticMarkup(
			<img
				src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Plane_icon_nose_up.svg/496px-Plane_icon_nose_up.svg.png?20141218235031'
				alt='airplane'
				style={{
					width: '40px',
					height: '40px',
					transform: 'rotate(-35deg) translateX(-5px) translateY(-25px)',
					filter: 'opacity(0.5) drop-shadow(0 0 red)',
				}}
			/>,
		),
		iconSize: [3, 3],
	})

	const level2AirplaneIcon = divIcon({
		html: renderToStaticMarkup(
			<img
				src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Plane_icon_nose_up.svg/496px-Plane_icon_nose_up.svg.png?20141218235031'
				alt='airplane'
				style={{
					width: '40px',
					height: '40px',
					transform: 'rotate(-100deg) translateX(25px) translateY(-12.5px)',
					filter: 'opacity(0.5) drop-shadow(0 0 green)',
				}}
			/>,
		),
		iconSize: [3, 3],
	})

	const level3AirplaneIcon = divIcon({
		html: renderToStaticMarkup(
			<img
				src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Plane_icon_nose_up.svg/496px-Plane_icon_nose_up.svg.png?20141218235031'
				alt='airplane'
				style={{
					width: '40px',
					height: '40px',
					transform: 'rotate(140deg) translateX(3px) translateY(34px)',
					filter: 'opacity(0.5) drop-shadow(0 0 blue)',
				}}
			/>,
		),
		iconSize: [3, 3],
	})
	const level4AirplaneIcon = divIcon({
		html: renderToStaticMarkup(
			<img
				src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Plane_icon_nose_up.svg/496px-Plane_icon_nose_up.svg.png?20141218235031'
				alt='airplane'
				style={{
					width: '40px',
					height: '40px',
					transform: 'rotate(40deg) translateX(-30px) translateY(3px)',
					filter: 'opacity(0.5) drop-shadow(0 0 yellow)',
				}}
			/>,
		),
		iconSize: [3, 3],
	})
	const level5AirplaneIcon = divIcon({
		html: renderToStaticMarkup(
			<img
				src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Plane_icon_nose_up.svg/496px-Plane_icon_nose_up.svg.png?20141218235031'
				alt='airplane'
				style={{
					width: '40px',
					height: '40px',
					transform: 'rotate(-50deg) translateX(3px) translateY(-25px)',
					filter: 'opacity(0.5) drop-shadow(0 0 orange)',
				}}
			/>,
		),
		iconSize: [3, 3],
	})

	const level1Icon = divIcon({
		html: renderToStaticMarkup(
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: randomDarkHsl(),
					borderRadius: '50%',
					border: '1px solid black',
					width: '30px',
					height: '30px',

					color: 'white',
					fontSize: '20px',

					transform: 'translateX(-15px) translateY(-15px)',
				}}
			>
				1
			</div>,
		),
		iconSize: [1, 1],
	})
	const level2Icon = divIcon({
		html: renderToStaticMarkup(
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: randomDarkHsl(),
					borderRadius: '50%',
					border: '1px solid black',
					width: '30px',
					height: '30px',

					color: 'white',
					fontSize: '20px',

					transform: 'translateX(-15px) translateY(-15px)',
				}}
			>
				2
			</div>,
		),
		iconSize: [1, 1],
	})

	const level3Icon = divIcon({
		html: renderToStaticMarkup(
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: randomDarkHsl(),
					borderRadius: '50%',
					border: '1px solid black',
					width: '30px',
					height: '30px',

					color: 'white',
					fontSize: '20px',

					transform: 'translateX(-15px) translateY(-15px)',
				}}
			>
				3
			</div>,
		),
		iconSize: [1, 1],
	})

	const level4Icon = divIcon({
		html: renderToStaticMarkup(
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: randomDarkHsl(),
					borderRadius: '50%',
					border: '1px solid black',
					width: '30px',
					height: '30px',

					color: 'white',
					fontSize: '20px',

					transform: 'translateX(-15px) translateY(-15px)',
				}}
			>
				4
			</div>,
		),
		iconSize: [1, 1],
	})

	const level5Icon = divIcon({
		html: renderToStaticMarkup(
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: randomDarkHsl(),
					borderRadius: '50%',
					border: '1px solid black',
					width: '30px',
					height: '30px',

					color: 'white',
					fontSize: '20px',

					transform: 'translateX(-15px) translateY(-15px)',
				}}
			>
				5
			</div>,
		),
		iconSize: [1, 1],
	})

	const level6Icon = divIcon({
		html: renderToStaticMarkup(
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: randomDarkHsl(),
					borderRadius: '50%',
					border: '1px solid black',
					width: '30px',
					height: '30px',

					color: 'white',
					fontSize: '20px',

					transform: 'translateX(-15px) translateY(-15px)',
				}}
			>
				6
			</div>,
		),
		iconSize: [1, 1],
	})

	const countryTransform = (from: Country, to: Country) => {
		if (from === 'asia' && to === 'africa') {
			return 'rotate(-35deg) translateX(-5px) translateY(-25px)'
		} else if (from === 'africa' && to === 'europe') {
			return 'rotate(-35deg) translateX(-5px) translateY(-25px)'
		} else if (from === 'europe' && to === 'usa') {
			return 'rotate(-100deg) translateX(25px) translateY(-12.5px)'
		} else if (from === 'usa' && to === 'antarctica') {
			return 'rotate(140deg) translateX(3px) translateY(34px)'
		} else if (from === 'antarctica' && to === 'australia') {
			return 'rotate(40deg) translateX(-30px) translateY(3px)'
		}
		return ''
	}

	return (
		<>
			{Object.values(countriesLatLng).map((country, index) => (
				<Fragment key={index}>
					<Marker
						icon={
							index == 0
								? level1Icon
								: index == 1
								? level2Icon
								: index == 2
								? level3Icon
								: index == 3
								? level4Icon
								: index == 4
								? level5Icon
								: level6Icon
						}
						position={[country.latitude, country.longitude]}
					/>
				</Fragment>
			))}

			{currentManagerFromTo && isAirplaneCluster ? (
				<>
					{(() => {
						const countryFrom = countriesLatLng[currentManagerFromTo.countryFrom]
						const countryTo = countriesLatLng[currentManagerFromTo.countryTo]
						console.log(currentManagerFromTo.progress)

						const position = [
							countryFrom.latitude +
								((countryTo.latitude - countryFrom.latitude) * currentManagerFromTo.progress!) / 100,
							countryFrom.longitude +
								((countryTo.longitude - countryFrom.longitude) * currentManagerFromTo.progress!) / 100,
						]

						const airplaneIcon = divIcon({
							html: renderToStaticMarkup(
								<img
									src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Aircraft_Airport_ecomo.svg/1920px-Aircraft_Airport_ecomo.svg.png'
									alt='airplane'
									style={{
										width: '40px',
										height: '40px',
										transform: countryTransform(currentManagerFromTo.countryFrom, currentManagerFromTo.countryTo),

										// filter: `invert(31%) sepia(78%) saturate(1211%) hue-rotate(190%) brightness(107%) opacity(0.5) drop-shadow(0 0 ${randomDarkColor()})`,
									}}
								/>,
							),
							iconSize: [3, 3],
						})

						return (
							<Marker
								eventHandlers={{
									click: () => {
										map.flyTo(position as any, 6, { animate: false })
										onAirplaneClusterClick(false)
									},
								}}
								icon={airplaneIcon}
								position={position as any}
							/>
						)
					})()}
				</>
			) : (
				<>
					{currentManagerFromTo &&
						[...currentManagerFromTo.managers].map((manager, index) => {
							const countryFrom = countriesLatLng[currentManagerFromTo.countryFrom]
							const countryTo = countriesLatLng[currentManagerFromTo.countryTo]

							const position = [
								countryFrom.latitude +
									((countryTo.latitude - countryFrom.latitude) * currentManagerFromTo.progress!) / 100,
								countryFrom.longitude +
									((countryTo.longitude - countryFrom.longitude) * currentManagerFromTo.progress!) / 100,
							]
							const computePosition = [
								(position[0]! * (Math.sqrt(position[0]! ** 2 + position[1]! ** 2) + 0.3 * index)) /
									Math.sqrt(position[0]! ** 2 + position[1]! ** 2),
								(position[1]! * (Math.sqrt(position[0]! ** 2 + position[1]! ** 2) - 3 * index)) /
									Math.sqrt(position[0]! ** 2 + position[1]! ** 2),
							]

							const airplaneIcon = divIcon({
								html: renderToStaticMarkup(
									<svg
										version='1.1'
										id='VARG'
										xmlns='http://www.w3.org/2000/svg'
										x='0px'
										y='0px'
										width='305px'
										height='313px'
										viewBox='0 0 305 313'
										style={{
											width: '40px',
											height: '40px',
											transform: countryTransform(currentManagerFromTo.countryFrom, currentManagerFromTo.countryTo),
											fill: manager.color,
											stroke: 'black',
										}}
									>
										<g>
											<path
												d='M134.875,19.74c0.04-22.771,34.363-22.771,34.34,0.642v95.563L303,196.354v35.306l-133.144-43.821v71.424l30.813,24.072
v27.923l-47.501-14.764l-47.501,14.764v-27.923l30.491-24.072v-71.424L3,231.66v-35.306l131.875-80.409V19.74z'
											/>
										</g>
									</svg>,
								),
								iconSize: [3, 3],
							})

							return (
								<Marker key={index} icon={airplaneIcon} position={computePosition as any}>
									<Popup>
										<div>
											<div>
												<span>Место:</span>
												<span>{manager.rank}</span>
											</div>
											<div>
												<span>Менеджер:</span>
												<span>{manager.user}</span>
											</div>
											<div>
												<span>Новые клиенты:</span>
												<span>{manager.newClient}</span>
											</div>
											<div>
												<span>Очки:</span>
												<span>{manager.score}</span>
											</div>
											<div>
												<span>Набранная сумма:</span>
												<span>{manager.sumMoney}</span>
											</div>
										</div>
									</Popup>
								</Marker>
							)
						})}
				</>
			)}

			{managersFromTo &&
				managersFromTo.map((managerFromTo, index) => {
					const countryFrom = countriesLatLng[managerFromTo.countryFrom]
					const countryTo = countriesLatLng[managerFromTo.countryTo]

					return (
						<Polyline
							key={index}
							dashArray={[10, 10]}
							positions={[
								[countryFrom.latitude, countryFrom.longitude],
								[countryTo.latitude, countryTo.longitude],
							]}
							pathOptions={{
								color: managerFromTo.progress === 100 ? 'green' : 'red',
							}}
						/>
					)
				})}
		</>
	)
}
