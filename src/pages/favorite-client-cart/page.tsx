import {
	ChevronDownIcon,
	ChevronRightIcon,
	DeleteIcon,
	EditIcon,
	ExternalLinkIcon,
	WarningIcon,
} from '@chakra-ui/icons'
import {
	Badge,
	Box,
	Button,
	Center,
	Checkbox,
	Container,
	Heading,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Select,
	Spinner,
	Stack,
	Text,
	Tooltip,
} from '@chakra-ui/react'
import { useUnit } from 'effector-react'
import 'leaflet-routing-machine'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import React from 'react'
import { Polygon } from 'react-leaflet'
import { useNavigate } from 'react-router'

import { Header } from '~src/widgets/header'

import { ClientInformalPointFactory } from '~src/features/client-informal-point'
import { ClientOfficeFactory } from '~src/features/client-office'
import { LandsToLandFactory } from '~src/features/lands-to-land'

import { MapFactory } from '~src/entities/map'
import { sessionModel } from '~src/entities/session'

import { type FavoriteClientInfo, type PlannedMeeting } from '~src/shared/api'
import { zIndices } from '~src/shared/lib'
import { routes } from '~src/shared/routes'
import { type Column, TableFactory, type TableState, useTable } from '~src/shared/ui'

import * as model from './model'

export function FavoriteClientCartPage() {
	const [handleMount, handleUnmount] = useUnit([
		model.favoriteClientCartPageMounted,
		model.favoriteClientCartPageUnmounted,
	])

	React.useEffect(() => {
		handleMount()

		return () => {
			handleUnmount()
		}
	}, [])

	return (
		<Box>
			<Header />
			<Container maxW='full' minH='calc(100vh - 4rem)' py='20' px={{ xl: '16', sm: '4' }}>
				<Stack minH='inherit'>
					<Stack spacing='5'>
						<Heading>Избранные клиенты</Heading>
						<ClientsTable />
					</Stack>
					<Box alignSelf='end'>
						<PlannedMeetingsCreateButton />
					</Box>
					<Stack spacing='5'>
						<Heading>Запланированные встречи</Heading>
						<PlannedMeetingsTable />
					</Stack>
				</Stack>
			</Container>

			<PlannedMeetingsCreateModal />
			<SelectClientPlotMeetingPlaceModal />
			<SelectClientOfficeMeetingPlaceModal />
			<SelectClientInformalMeetingPlaceModal />
		</Box>
	)
}

function PlannedMeetingsCreateButton() {
	const [hasPlannedMeetings, handleClick] = useUnit([model.$hasPlannedMeetings, model.plannedMeetingsCreateClicked])

	return (
		<Button colorScheme='blue' isDisabled={!hasPlannedMeetings} onClick={() => handleClick()}>
			Запланировать встречу
		</Button>
	)
}

function ClientsTable() {
	const [favoriteClients, favoriteClientsPending] = useUnit([
		model.$favoriteClientsInfo,
		model.$favoriteClientsInfoPending,
	])
	const [tableState, handleRowSelect, handleAllRowSelect, handleMeetingTypeSelect, handleMeetingPlaceSelect] = useUnit([
		model.$$favoriteClientsTable.$tableState,
		model.$$favoriteClientsTable.rowSelected,
		model.$$favoriteClientsTable.allRowSelected,
		model.$$favoriteClientsTable.rowMeetingTypeSelected,
		model.$$favoriteClientsTable.rowMeetingPlaceSelected,
	])
	const [editCurrentMeetingPlaceClick, handleDeleteFavoriteClient] = useUnit([
		model.editCurrentMeetingPlaceClicked,
		model.deleteFavoriteClientClicked,
	])
	const navigate = useNavigate()

	const columns = React.useMemo<Array<Column<FavoriteClientInfo, model.FavoriteClientsTableState>>>(
		() => [
			{
				header: ({ tableState }) => {
					const rowSelectValues = Object.values(tableState.rowSelect)
					const allSelect = rowSelectValues.length !== 0 && rowSelectValues.every((row) => !!row)
					const isIndeterminate = rowSelectValues.length !== 0 && !allSelect && rowSelectValues.some((row) => !!row)

					return (
						<TableFactory.Th w='1%' borderInlineEndWidth='1px' borderColor='whiteAlpha.600'>
							<Checkbox
								isIndeterminate={isIndeterminate}
								isChecked={allSelect}
								onChange={(e) => handleAllRowSelect({ value: e.target.checked })}
								color='white'
							/>
						</TableFactory.Th>
					)
				},
				cell: ({ rowIndex, tableState }) => (
					<TableFactory.Td borderInlineEndWidth='1px' borderColor='blackAlpha.300'>
						<Checkbox
							isChecked={tableState.rowSelect[rowIndex] ?? false}
							onChange={() => handleRowSelect({ rowIndex })}
						/>
					</TableFactory.Td>
				),
			},
			{
				header: () => (
					<TableFactory.Th color='white' borderInlineEndWidth='1px' borderColor='whiteAlpha.600'>
						Тип Встречи
					</TableFactory.Th>
				),
				cell: ({ item, tableState, rowIndex }) => {
					const selectTypeValue = tableState.rowMeetingType[rowIndex]?.id ?? ''
					const selectTypeName = tableState.rowMeetingType[rowIndex]?.name ?? ''
					console.log(selectTypeValue)

					function handleChange(event: any) {
						const value = event.target.value
						const name = item.meetingType.find((type) => type.id === Number(event.target.value))?.name
						handleMeetingTypeSelect({
							rowIndex,
							id: value ? Number(value) : null,
							name: name ? name : null,
						})
					}

					return (
						<TableFactory.Td borderInlineEndWidth='1px' borderColor='blackAlpha.300'>
							<Tooltip label={selectTypeName ?? 'Выберите'}>
								<Box>
									<Select isDisabled={!tableState.rowSelect[rowIndex]} value={selectTypeValue} onChange={handleChange}>
										<option />
										{item.meetingType.map((type, index) => (
											<option key={index} value={type.id}>
												{type.name}
											</option>
										))}
									</Select>
								</Box>
							</Tooltip>
						</TableFactory.Td>
					)
				},
			},
			{
				header: () => (
					<TableFactory.Th color='white' borderInlineEndWidth='1px' borderColor='whiteAlpha.600'>
						Место Встречи
					</TableFactory.Th>
				),
				cell: ({ item, tableState, rowIndex }) => {
					const selectPlaceValue = tableState.rowMeetingPlace[rowIndex]?.id ?? ''
					const selectPlaceName = tableState.rowMeetingPlace[rowIndex]?.name ?? ''
					const editIsAccess =
						(tableState.rowMeetingPlace[rowIndex]?.id === model.MEETING_PLACE_TYPE.clientPlot &&
							tableState.rowClientPlot[rowIndex]) ||
						(tableState.rowMeetingPlace[rowIndex]?.id === model.MEETING_PLACE_TYPE.office &&
							tableState.rowClientOfficePoint[rowIndex] &&
							tableState.rowClientOfficeDuration[rowIndex] &&
							tableState.rowClientOfficeDistance[rowIndex]) ||
						(tableState.rowMeetingPlace[rowIndex]?.id === model.MEETING_PLACE_TYPE.informal &&
							tableState.rowClientInformalPointMarker[rowIndex] &&
							tableState.rowClientInformalPointRef[rowIndex] &&
							tableState.rowClientInformalPointDescription[rowIndex])

					function handleChange(event: any) {
						const value = event.target.value
						const name = item.meetingPlace.find((type) => type.id === Number(value))?.name
						handleMeetingPlaceSelect({
							rowIndex,
							id: value ? Number(value) : null,
							name: name ? name : null,
						})
					}

					return (
						<TableFactory.Td borderInlineEndWidth='1px' borderColor='blackAlpha.300'>
							<Tooltip label={selectPlaceName ?? 'Выберите'}>
								<Stack direction='row'>
									<Select
										isDisabled={!tableState.rowSelect[rowIndex] || !tableState.rowMeetingType[rowIndex]}
										value={selectPlaceValue}
										onChange={handleChange}
									>
										<option value={undefined} />
										{item.meetingPlace.map((place, index) => (
											<option key={index} value={place.id}>
												{place.name}
											</option>
										))}
									</Select>
									<Button isDisabled={!editIsAccess} onClick={() => editCurrentMeetingPlaceClick()}>
										<EditIcon />
									</Button>
								</Stack>
							</Tooltip>
						</TableFactory.Td>
					)
				},
			},
			{
				header: () => (
					<TableFactory.Th color='white' borderInlineEndWidth='1px' borderColor='whiteAlpha.600'>
						ФИО
					</TableFactory.Th>
				),
				cell: ({ item }) => (
					<TableFactory.Td borderInlineEndWidth='1px' borderColor='blackAlpha.300'>
						{item.clientName}
					</TableFactory.Td>
				),
			},
			{
				header: () => (
					<TableFactory.Th color='white' borderInlineEndWidth='1px' borderColor='whiteAlpha.600'>
						Адрес
					</TableFactory.Th>
				),
				cell: ({ item }) => (
					<TableFactory.Td borderInlineEndWidth='1px' borderColor='blackAlpha.300'>
						{item.clientAddress}
					</TableFactory.Td>
				),
			},
			{
				header: () => (
					<TableFactory.Th color='white' borderInlineEndWidth='1px' borderColor='whiteAlpha.600'>
						Иин
					</TableFactory.Th>
				),
				cell: ({ item }) => (
					<TableFactory.Td borderInlineEndWidth='1px' borderColor='blackAlpha.300'>
						{item.clientBin}
					</TableFactory.Td>
				),
			},
			{
				header: () => (
					<TableFactory.Th color='white' borderInlineEndWidth='1px' borderColor='whiteAlpha.600'>
						&nbsp;
					</TableFactory.Th>
				),
				cell: ({ item }) => (
					<TableFactory.Td borderInlineEndWidth='1px' borderColor='blackAlpha.300'>
						<Button colorScheme='red' onClick={() => handleDeleteFavoriteClient(item.clientId)}>
							<DeleteIcon />
						</Button>
					</TableFactory.Td>
				),
			},
			{
				header: () => <TableFactory.Th color='white'>&nbsp;</TableFactory.Th>,
				cell: ({ item }) => (
					<TableFactory.Td>
						<Button onClick={() => navigate(routes.clientProfile({ clientId: item.clientId.toString() }))}>
							<ExternalLinkIcon />
						</Button>
					</TableFactory.Td>
				),
			},
		],
		[],
	)

	const { getHeaders, getCells } = useTable({
		data: favoriteClients,
		columns,
		tableState,
	})

	return (
		<TableFactory.TableContainer
			borderColor='lightgray'
			borderWidth='1px'
			borderRadius='md'
			boxShadow='md'
			overflow='auto'
			whiteSpace='pre-wrap'
			w='full'
			h='fit-content'
		>
			<TableFactory.Table
				sx={{ borderCollapse: 'collapse' }}
				overflow='hidden'
				position='relative'
				borderStyle='hidden'
			>
				<TableFactory.THead bgColor='blue.500'>
					<TableFactory.Tr>
						{getHeaders().map((item, index) => (
							<React.Fragment key={index}>{item}</React.Fragment>
						))}
					</TableFactory.Tr>
				</TableFactory.THead>
				<TableFactory.TBody
					columnLength={columns.length}
					empty={{ empty: favoriteClients.length === 0 }}
					loading={{ loading: favoriteClientsPending }}
				>
					{getCells().map((item, index) => (
						<TableFactory.Tr key={index}>
							<>{item}</>
						</TableFactory.Tr>
					))}
				</TableFactory.TBody>
			</TableFactory.Table>
		</TableFactory.TableContainer>
	)
}

function PlannedMeetingsTable() {
	const [plannedMeetings, plannedMeetingsPending] = useUnit([model.$plannedMeetings, model.$plannedMeetingsPending])
	const [tableState, handleRowExtend] = useUnit([
		model.$$plannedMeetingsTable.$tableState,
		model.$$plannedMeetingsTable.rowExtended,
	])

	const columns = React.useMemo<Column<PlannedMeeting, Pick<TableState, 'rowExtend'>>[]>(
		() => [
			{
				header: () => (
					<TableFactory.Th w='1%' color='white' borderInlineEndWidth='1px' borderColor='whiteAlpha.600'>
						&nbsp;
					</TableFactory.Th>
				),
				cell: ({ item }) => (
					<TableFactory.Td borderInlineEndWidth='1px' borderColor='blackAlpha.300'>
						{item.id}
					</TableFactory.Td>
				),
			},
			{
				header: () => <TableFactory.Th color='white'>Дата</TableFactory.Th>,
				cell: ({ item, tableState, rowIndex }) => {
					return (
						<TableFactory.Td>
							<Stack direction='row' align='center'>
								<Text>{item.date}</Text>
								<Button variant='ghost' onClick={() => handleRowExtend({ rowIndex })}>
									{tableState.rowExtend[rowIndex] ? <ChevronDownIcon /> : <ChevronRightIcon />}
								</Button>
							</Stack>
							{tableState.rowExtend[rowIndex] && (
								<TableFactory.TableContainer
									borderColor='lightgray'
									borderWidth='1px'
									borderRadius='md'
									boxShadow='md'
									overflow='auto'
									whiteSpace='pre-wrap'
									w='full'
									h='fit-content'
								>
									<TableFactory.Table
										sx={{ borderCollapse: 'collapse' }}
										overflow='hidden'
										position='relative'
										borderStyle='hidden'
									>
										<TableFactory.THead bgColor='blue.500'>
											<TableFactory.Tr>
												<TableFactory.Th color='white' borderInlineEndWidth='1px' borderColor='whiteAlpha.600'>
													Имя Клиента
												</TableFactory.Th>
												<TableFactory.Th color='white' borderInlineEndWidth='1px' borderColor='whiteAlpha.600'>
													Адресс Клиента
												</TableFactory.Th>
												<TableFactory.Th color='white' borderInlineEndWidth='1px' borderColor='whiteAlpha.600'>
													Иин клиента
												</TableFactory.Th>
												<TableFactory.Th color='white' borderInlineEndWidth='1px' borderColor='whiteAlpha.600'>
													Тип встречи
												</TableFactory.Th>
												<TableFactory.Th color='white'>Место встречи</TableFactory.Th>
											</TableFactory.Tr>
										</TableFactory.THead>
										<TableFactory.TBody columnLength={4} empty={{ empty: false }}>
											{item.meetingClients.map((client, index) => (
												<TableFactory.Tr key={index}>
													<TableFactory.Td borderInlineEndWidth='1px' borderColor='blackAlpha.300'>
														{client.name}
													</TableFactory.Td>
													<TableFactory.Td borderInlineEndWidth='1px' borderColor='blackAlpha.300'>
														{client.address}
													</TableFactory.Td>
													<TableFactory.Td borderInlineEndWidth='1px' borderColor='blackAlpha.300'>
														{client.iin}
													</TableFactory.Td>
													<TableFactory.Td borderInlineEndWidth='1px' borderColor='blackAlpha.300'>
														{client.meetingName}
													</TableFactory.Td>
													<TableFactory.Td>{client.meetingName}</TableFactory.Td>
												</TableFactory.Tr>
											))}
										</TableFactory.TBody>
									</TableFactory.Table>
								</TableFactory.TableContainer>
							)}
						</TableFactory.Td>
					)
				},
			},
		],
		[],
	)

	const { getHeaders, getCells } = useTable({
		data: plannedMeetings,
		columns,
		tableState,
	})

	return (
		<TableFactory.TableContainer
			borderColor='lightgray'
			borderWidth='1px'
			borderRadius='md'
			boxShadow='md'
			overflow='auto'
			whiteSpace='pre-wrap'
			w='full'
			h='fit-content'
		>
			<TableFactory.Table
				sx={{ borderCollapse: 'collapse' }}
				overflow='hidden'
				position='relative'
				borderStyle='hidden'
			>
				<TableFactory.THead bgColor='blue.500'>
					<TableFactory.Tr>
						{getHeaders().map((header, index) => (
							<React.Fragment key={index}>{header}</React.Fragment>
						))}
					</TableFactory.Tr>
				</TableFactory.THead>
				<TableFactory.TBody
					columnLength={columns.length}
					empty={{ empty: plannedMeetings.length === 0 }}
					loading={{ loading: plannedMeetingsPending }}
				>
					{getCells().map((cell, index) => (
						<TableFactory.Tr key={index}>{cell}</TableFactory.Tr>
					))}
				</TableFactory.TBody>
			</TableFactory.Table>
		</TableFactory.TableContainer>
	)
}

function PlannedMeetingsCreateModal() {
	const [modalsState, handleModalClose] = useUnit([
		model.$$favoriteClientsPageModals.$modalsState,
		model.$$favoriteClientsPageModals.modalCloseClicked,
	])

	const [plannedMeetingsDate, handlePlannedMeetingsDataChange] = useUnit([
		model.$plannedMeetingsDate,
		model.handlePlannedMeetingsDateChanged,
	])
	const [handlePlannedMeetingsCreate] = useUnit([model.plannedMeetingsCreated])

	return (
		<>
			<Modal
				onClose={() => handleModalClose({ modalName: 'plannedMeetingsCreate' })}
				isOpen={modalsState.plannedMeetingsCreate}
				isCentered
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Запланировать встречи</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Stack>
							<Input
								type='date'
								value={model.getValueFromDate(plannedMeetingsDate)}
								onChange={handlePlannedMeetingsDataChange}
							/>
							<Stack direction='row' align='center'>
								<WarningIcon color='red' />
								<Text color='red'>Выберите дату встречи</Text>
							</Stack>
						</Stack>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme='blue' onClick={() => handlePlannedMeetingsCreate()}>
							Создать
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

function SelectClientPlotMeetingPlaceModal() {
	const [modalsState, handleModalClose] = useUnit([
		model.$$favoriteClientsPageModals.$modalsState,
		model.$$favoriteClientsPageModals.modalCloseClicked,
	])
	const [clientPlotsPending] = useUnit([model.$$favoriteClientPlots.$clientPlotsPending])
	const [setButtonAccess, handleSetClick] = useUnit([model.$clientPlotAccess, model.clientPlotSettled])

	return (
		<Modal
			onClose={() => handleModalClose({ modalName: 'selectClientPlotMeetingPlaceModal' })}
			isOpen={modalsState.selectClientPlotMeetingPlaceModal}
			isCentered
			size='6xl'
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Встретиться на поле</ModalHeader>
				<ModalCloseButton />
				<ModalBody position='relative' minH='600px'>
					<>
						<MapFactory.Map
							model={model.mapModel}
							containerProps={{ w: 'full', h: 'full', minH: 'inherit', zIndex: zIndices.map }}
							style={{ width: '100%', height: '100%', minHeight: 'inherit' }}
						>
							<LandsToLandFactory.Lands model={model.$$favoriteClientPlotsToClientPlot}>
								{({ land: clientPlot, onClick }) => (
									<Polygon
										positions={clientPlot.geometryRings as any}
										pathOptions={{ color: 'blue' }}
										eventHandlers={{
											click: () => {
												onClick(clientPlot.plotId)
											},
										}}
									/>
								)}
							</LandsToLandFactory.Lands>
							<LandsToLandFactory.Land model={model.$$favoriteClientPlotsToClientPlot}>
								{({ land: clientPlot }) => (
									<Polygon positions={clientPlot.geometryRings as any} pathOptions={{ color: 'white' }} />
								)}
							</LandsToLandFactory.Land>
						</MapFactory.Map>

						{clientPlotsPending && (
							<Center position='absolute' top='50%' left='50%' zIndex='sticky'>
								<Spinner colorScheme='blue' />
							</Center>
						)}
					</>
				</ModalBody>
				<ModalFooter>
					<Button colorScheme='blue' isDisabled={!setButtonAccess} onClick={() => handleSetClick()}>
						Установить
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

function SelectClientOfficeMeetingPlaceModal() {
	const [modalsState, handleModalClose] = useUnit([
		model.$$favoriteClientsPageModals.$modalsState,
		model.$$favoriteClientsPageModals.modalCloseClicked,
	])
	const [clientOffice, clientOfficePending] = useUnit([
		model.$$favoriteClientOffice.$clientOffice,
		model.$$favoriteClientOffice.$clientOfficePending,
	])
	const [setButtonAccess, handleSetClick] = useUnit([model.$clientOfficeAccess, model.clientOfficeSettled])

	return (
		<Modal
			onClose={() => handleModalClose({ modalName: 'selectOfficeMeetingPlaceModal' })}
			isOpen={modalsState.selectOfficeMeetingPlaceModal}
			isCentered
			size='6xl'
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Встретиться в офисе</ModalHeader>
				<ModalCloseButton />
				<ModalBody position='relative' minH='600px'>
					<Stack minH='inherit'>
						<Stack direction='row'>
							<Badge colorScheme='blue'>{clientOffice?.directionMatrix.destination_addresses}</Badge>
							<Badge colorScheme='blue'>{clientOffice?.directionMatrix.origin_addresses}</Badge>
							<Badge colorScheme='blue'>{clientOffice?.directionMatrix?.rows[0]?.elements[0]?.duration.value}</Badge>
							<Badge colorScheme='blue'>{clientOffice?.directionMatrix?.rows[0]?.elements[0]?.distance.value}</Badge>
						</Stack>

						<MapFactory.Map
							model={model.mapModel}
							containerProps={{ w: 'full', h: 'full', minH: 'inherit', zIndex: zIndices.map }}
							style={{ width: '100%', height: '100%', minHeight: 'inherit' }}
						>
							<LandsToLandFactory.Lands model={model.$$favoriteClientPlotsToClientPlot}>
								{({ land: clientPlot }) => (
									<Polygon positions={clientPlot.geometryRings as any} pathOptions={{ color: 'blue' }} />
								)}
							</LandsToLandFactory.Lands>

							<ClientOfficeFactory.ClientOffice model={model.$$favoriteClientOffice} />
						</MapFactory.Map>
					</Stack>

					{clientOfficePending && (
						<Center position='absolute' top='50%' left='50%' zIndex='sticky'>
							<Spinner colorScheme='blue' />
						</Center>
					)}
				</ModalBody>
				<ModalFooter>
					<Button colorScheme='blue' isDisabled={!setButtonAccess} onClick={() => handleSetClick()}>
						Установить
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

function SelectClientInformalMeetingPlaceModal() {
	const [modalsState, handleModalClose] = useUnit([
		model.$$favoriteClientsPageModals.$modalsState,
		model.$$favoriteClientsPageModals.modalCloseClicked,
	])
	const [clientInformalRefsPending] = useUnit([model.$$favoriteClientInformalPoint.$refsPending])
	const [setButtonAccess, handleSetClick] = useUnit([
		model.$clientInformalPointAccess,
		model.clientInformalPointSettled,
	])

	return (
		<Modal
			onClose={() => handleModalClose({ modalName: 'selectInformalMeetingPlaceModal' })}
			isOpen={modalsState.selectInformalMeetingPlaceModal}
			isCentered
			size='6xl'
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Встретиться неформально</ModalHeader>
				<ModalCloseButton />
				<ModalBody position='relative' minH='600px'>
					<Stack minH='inherit'>
						<MapFactory.Map
							model={model.mapModel}
							containerProps={{ w: 'full', h: 'full', minH: 'inherit', zIndex: zIndices.map }}
							style={{ width: '100%', height: '100%', minHeight: 'inherit' }}
						>
							<LandsToLandFactory.Lands model={model.$$favoriteClientPlotsToClientPlot}>
								{({ land: clientPlot }) => (
									<Polygon positions={clientPlot.geometryRings as any} pathOptions={{ color: 'blue' }} />
								)}
							</LandsToLandFactory.Lands>

							<ClientInformalPointFactory.ClientInformalPointMarker model={model.$$favoriteClientInformalPoint} />
						</MapFactory.Map>
						<ClientInformalPointFactory.ClientInformalPointMarkerErrorMessages
							model={model.$$favoriteClientInformalPoint}
						/>

						<Stack>
							<ClientInformalPointFactory.ClientInformalPointRefSelect model={model.$$favoriteClientInformalPoint} />
							<ClientInformalPointFactory.ClientInformalPointDescriptionInput
								model={model.$$favoriteClientInformalPoint}
							/>
						</Stack>
					</Stack>

					{clientInformalRefsPending && (
						<Center position='absolute' top='50%' left='50%' zIndex='sticky'>
							<Spinner colorScheme='blue' />
						</Center>
					)}
				</ModalBody>
				<ModalFooter>
					<Button colorScheme='blue' isDisabled={!setButtonAccess} onClick={() => handleSetClick()}>
						Установить
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}
