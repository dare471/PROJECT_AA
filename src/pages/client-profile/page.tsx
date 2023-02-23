import {
	Badge,
	Box,
	Center,
	Container,
	Grid,
	Spinner,
	Stack,
	StackItem,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
} from '@chakra-ui/react'
import { useUnit } from 'effector-react'
import React from 'react'
import { Marker, Polygon, Tooltip } from 'react-leaflet'
import { useParams } from 'react-router'

import { Header } from '~src/widgets/header'

import { LandsToLandFactory } from '~src/features/lands-to-land'

import { ClientCard, ClientContacts, ClientPlotsFactory } from '~src/entities/client'
import { ClientLastContractCard, ClientManagers } from '~src/entities/client/ui'
import { MapFactory } from '~src/entities/map'

import { type ClientContract, type ClientSubsidy } from '~src/shared/api'
import { type Column, TableFactory, useTable } from '~src/shared/ui'

import * as model from './model'
import { cultureColors } from '../map/lib'

export function ClientProfilePage() {
	const [handleMount, handleUnmount] = useUnit([model.clientProfilePageMounted, model.clientProfilePageUnmounted])
	const [tabIndex, handleTabChange] = useUnit([model.$$tabs.$tab, model.$$tabs.tabChanged])
	const { clientId } = useParams()

	React.useEffect(() => {
		handleMount({ clientId: Number(clientId) })

		return () => handleUnmount()
	}, [handleMount, handleUnmount, clientId])

	return (
		<Box>
			<Header />
			<Container maxW='container.xl' py='10'>
				<Stack direction={{ base: 'column', md: 'row' }} spacing='2'>
					<StackItem w={{ base: '100%', md: '75%' }} minH='0'>
						<Tabs index={tabIndex} onChange={handleTabChange} isFitted shadow='md' rounded='md'>
							<TabList>
								<Tab>Основная</Tab>
								<Tab>Субсидий</Tab>
								<Tab>Контракты</Tab>
							</TabList>
							<TabPanels>
								<TabPanel>
									<MainTabPanel />
								</TabPanel>
								<TabPanel>
									<SubsidiesTabPanel />
								</TabPanel>
								<TabPanel>
									<ContractsTabPanel />
								</TabPanel>
							</TabPanels>
						</Tabs>
					</StackItem>
					<StackItem w={{ base: '100%', md: '25%' }} minH='0'>
						<Stack>
							<ClientBlock />
							<Box shadow='md' rounded='md' p='3'>
								<Box px='2' py='2'>
									<Text fontSize='xl' fontWeight='bold' color='blue.500'>
										Контакты
									</Text>
								</Box>
								<ClientContacts model={model.$$client} minH='15rem' maxH='20rem' overflow='auto' />
							</Box>
							<Box shadow='md' rounded='md' p='3'>
								<Box px='2' py='2'>
									<Text fontSize='xl' fontWeight='bold' color='blue.500'>
										Менеджеры
									</Text>
								</Box>
								<ClientManagers model={model.$$clientManagers} minH='15rem' maxH='20rem' overflow='auto' />
							</Box>
							<Box shadow='md' rounded='md' p='3'>
								<Box px='2' py='2'>
									<Text fontSize='xl' fontWeight='bold' color='blue.500'>
										Последний контракт
									</Text>
								</Box>
								<ClientLastContractBlock />
							</Box>
						</Stack>
					</StackItem>
				</Stack>
			</Container>
		</Box>
	)
}

function ClientBlock() {
	const [client, clientPending] = useUnit([model.$$client.$client, model.$$client.$clientPending])

	return (
		<>
			<ClientCard client={client} clientPending={clientPending} minH='20rem'>
				<></>
			</ClientCard>
		</>
	)
}

function ClientLastContractBlock() {
	const [lastContract, lastContractPending] = useUnit([
		model.$$clientLastContract.$clientLastContract,
		model.$$clientLastContract.$clientLastContractPending,
	])

	return (
		<>
			<ClientLastContractCard contract={lastContract} contractPending={lastContractPending} minH='10rem' />
		</>
	)
}

function MainTabPanel() {
	const [clientPoints, clientPointsPending] = useUnit([
		model.$$clientPoints.$clientPoints,
		model.$$clientPoints.$clientPointsPending,
	])
	const [clientPlots, clientPlot, clientPlotsPending] = useUnit([
		model.$$clientPlots.$clientPlots,
		model.$$clientPlotsToPlot.$land,
		model.$$clientPlots.$clientPlotsPending,
	])

	const clientCultures = React.useMemo(() => {
		return clientPlots.reduce((prev, acc) => {
			const findIndex = prev.findIndex((culture) => culture.plotCultId === acc.plotCultId)
			if (findIndex === -1) {
				prev.push({
					plotCultId: acc.plotCultId,
					plotCultName: acc.plotCultName,
				})
			}
			return prev
		}, [] as { plotCultId: number; plotCultName: string }[])
	}, [clientPlots])

	if (clientPointsPending || clientPlotsPending) {
		return (
			<Center flexGrow='1' minH='30rem'>
				<Spinner colorScheme='blue' />
			</Center>
		)
	}

	return (
		<Box position='relative'>
			<Grid templateColumns='1fr 300px'>
				<MapFactory.Map
					model={model.$$map}
					style={{ height: '100%', borderRadius: 'inherit' }}
					containerProps={{ height: 'max(50vh, 300px)', shadow: 'md', borderRadius: '20px' }}
				>
					<LandsToLandFactory.Lands model={model.$$clientPlotsToPlot}>
						{({ land, onClick }) => (
							<Polygon
								positions={land.geometryRings as any}
								pathOptions={{ color: 'blue' }}
								eventHandlers={{ click: () => onClick(land.id) }}
							/>
						)}
					</LandsToLandFactory.Lands>
					<LandsToLandFactory.Land model={model.$$clientPlotsToPlot}>
						{({ land }) => <Polygon positions={land.geometryRings as any} pathOptions={{ color: 'black' }} />}
					</LandsToLandFactory.Land>

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
				</MapFactory.Map>

				<Stack p='2'>
					<Stack direction='row' flexWrap='wrap'>
						{clientCultures.map((culture, index) => {
							const cultureColor = cultureColors[culture.plotCultId] ?? 'red'

							return (
								<Badge key={index} bgColor={cultureColor.bgColor} color={cultureColor.color} whiteSpace='pre-wrap'>
									{culture.plotCultName}
								</Badge>
							)
						})}
					</Stack>
					<Grid templateColumns='auto 1fr' gap='1' alignItems='center'>
						<Text fontSize='md' fontWeight='medium'>
							Участок:
						</Text>
						<Text fontSize='sm'>{clientPlot ? clientPlot.plotName : 'Не выбран'}</Text>
					</Grid>
					<Grid templateColumns='auto 1fr' gap='1' alignItems='center'>
						<Text fontSize='md' fontWeight='medium'>
							Культура:
						</Text>
						<Text fontSize='sm'>{clientPlot ? clientPlot.plotCultName : 'Не выбран'}</Text>
					</Grid>
					<Grid templateColumns='auto 1fr' gap='1' alignItems='center'>
						<Text fontSize='md' fontWeight='medium'>
							Площадь:
						</Text>
						<Text fontSize='sm'>{clientPlot ? `${clientPlot.plotArea} га` : 'Не выбран'}</Text>
					</Grid>
				</Stack>
			</Grid>

			{/* {(clientPlotsPending || clientPointsPending) && (
				<Center position='absolute' top='50%' left='50%' zIndex='sticky' transform='translateX(-50%) translateY(-50%)'>
					<Spinner colorScheme='blue' />
				</Center>
			)} */}
		</Box>
	)
}

function SubsidiesTabPanel() {
	const [subsidies, subsidiesPending] = useUnit([
		model.$$clientSubsidies.$clientSubsidies,
		model.$$clientSubsidies.$clientSubsidiesPending,
	])
	const [tableState] = useUnit([model.$$clientSubsidiesTable.$tableState])

	const columns = React.useMemo<Column<ClientSubsidy>[]>(
		() => [
			{
				header: () => <TableFactory.Th color='white'>Заявитель</TableFactory.Th>,
				cell: ({ item }) => <TableFactory.Td>{item.appName}</TableFactory.Td>,
			},
			{
				header: () => <TableFactory.Th color='white'>Вид деятельности</TableFactory.Th>,
				cell: ({ item }) => <TableFactory.Td>{item.activity}</TableFactory.Td>,
			},

			{
				header: () => (
					<TableFactory.Th isNumeric color='white'>
						Сумма
					</TableFactory.Th>
				),
				cell: ({ item }) => <TableFactory.Td isNumeric>{item.sum}</TableFactory.Td>,
			},
			{
				header: () => <TableFactory.Th color='white'>Единица измерения</TableFactory.Th>,
				cell: ({ item }) => <TableFactory.Td>{item.unit}</TableFactory.Td>,
			},
			{
				header: () => (
					<TableFactory.Th color='white' isNumeric>
						Дата подачи
					</TableFactory.Th>
				),
				cell: ({ item }) => <TableFactory.Td isNumeric>{item.paymentDate}</TableFactory.Td>,
			},
			{
				header: () => (
					<TableFactory.Th color='white' isNumeric>
						Дата оплаты
					</TableFactory.Th>
				),
				cell: ({ item }) => <TableFactory.Td isNumeric>{item.paymentDate}</TableFactory.Td>,
			},
			{
				header: () => <TableFactory.Th color='white'>Получатель</TableFactory.Th>,
				cell: ({ item }) => <TableFactory.Td>{item.providerName}</TableFactory.Td>,
			},
		],
		[],
	)
	const { getHeaders, getCells } = useTable({
		data: subsidies,
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
					empty={{ empty: subsidies.length === 0 }}
					loading={{ loading: subsidiesPending }}
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

function ContractsTabPanel() {
	const [contracts, contractsPending] = useUnit([
		model.$$clientContracts.$clientContracts,
		model.$$clientContracts.$clientContractsPending,
	])
	const [tableState] = useUnit([model.$$clientContractsTable.$tableState])

	const columns = React.useMemo<Column<ClientContract>[]>(
		() => [
			{
				header: () => <TableFactory.Th color='white'>Контракт</TableFactory.Th>,
				cell: ({ item }) => <TableFactory.Td>{item.name}</TableFactory.Td>,
			},
			{
				header: () => <TableFactory.Th color='white'>Способ доставки</TableFactory.Th>,
				cell: ({ item }) => <TableFactory.Td>{item.deliveryMethod}</TableFactory.Td>,
			},
			{
				header: () => (
					<TableFactory.Th color='white' isNumeric>
						Сезон
					</TableFactory.Th>
				),
				cell: ({ item }) => <TableFactory.Td isNumeric>{item.season}</TableFactory.Td>,
			},
			{
				header: () => <TableFactory.Th color='white'>Статус</TableFactory.Th>,
				cell: ({ item }) => <TableFactory.Td>{item.status}</TableFactory.Td>,
			},
			{
				header: () => <TableFactory.Th color='white'>Контрак менеджера</TableFactory.Th>,
				cell: ({ item }) => <TableFactory.Td>{item.managerContract}</TableFactory.Td>,
			},
			{
				header: () => <TableFactory.Th color='white'>Основной контракт</TableFactory.Th>,
				cell: ({ item }) => <TableFactory.Td>{item.mainContract}</TableFactory.Td>,
			},
			{
				header: () => (
					<TableFactory.Th color='white' isNumeric>
						Цифры
					</TableFactory.Th>
				),
				cell: ({ item }) => <TableFactory.Td isNumeric>{item.number}</TableFactory.Td>,
			},
			{
				header: () => (
					<TableFactory.Th color='white' isNumeric>
						Сумма
					</TableFactory.Th>
				),
				cell: ({ item }) => <TableFactory.Td isNumeric>{item.sum}</TableFactory.Td>,
			},
			{
				header: () => (
					<TableFactory.Th color='white' isNumeric>
						Дата создания
					</TableFactory.Th>
				),
				cell: ({ item }) => <TableFactory.Td isNumeric>{item.dateCreate}</TableFactory.Td>,
			},
			{
				header: () => (
					<TableFactory.Th color='white' isNumeric>
						Дата начала
					</TableFactory.Th>
				),
				cell: ({ item }) => <TableFactory.Td isNumeric>{item.dateStart}</TableFactory.Td>,
			},
			{
				header: () => (
					<TableFactory.Th color='white' isNumeric>
						Дата окончания
					</TableFactory.Th>
				),
				cell: ({ item }) => <TableFactory.Td isNumeric>{item.dateEnd}</TableFactory.Td>,
			},
			{
				header: () => <TableFactory.Th color='white'>Подтверждение</TableFactory.Th>,
				cell: ({ item }) => (
					<TableFactory.Td textAlign='center'>
						{item.success ? (
							<Badge colorScheme='green'>Подтверждено</Badge>
						) : (
							<Badge colorScheme='red'>Не Подтверждено</Badge>
						)}
					</TableFactory.Td>
				),
			},
		],
		[],
	)
	const { getHeaders, getCells } = useTable({
		data: contracts,
		columns,
		tableState,
	})

	return (
		<TableFactory.TableContainer
			borderColor='lightgray'
			borderWidth='1px'
			borderRadius='md'
			boxShadow='md'
			overflowY='auto'
			overflowX='auto'
			whiteSpace='pre-wrap'
			w='full'
			maxH='container.sm'
		>
			<TableFactory.Table
				sx={{ borderCollapse: 'collapse' }}
				overflow='hidden'
				position='relative'
				borderStyle='hidden'
			>
				<TableFactory.THead bgColor='blue.500' position='sticky' top='0' zIndex='1'>
					<TableFactory.Tr>
						{getHeaders().map((item, index) => (
							<React.Fragment key={index}>{item}</React.Fragment>
						))}
					</TableFactory.Tr>
				</TableFactory.THead>
				<TableFactory.TBody
					columnLength={columns.length}
					empty={{ empty: contracts.length === 0 }}
					loading={{ loading: contractsPending }}
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
