import { ArrowLeftIcon, ArrowRightIcon, DeleteIcon, StarIcon } from '@chakra-ui/icons'
import {
	Box,
	type BoxProps,
	Button,
	Center,
	Checkbox,
	Flex,
	Icon,
	Stack,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
	useCheckbox,
} from '@chakra-ui/react'
import { useUnit } from 'effector-react'
import React from 'react'
import { BsListUl } from 'react-icons/bs'
import { GrCircleInformation } from 'react-icons/gr'
import { TbPresentationAnalytics } from 'react-icons/tb'

import { RegionsTreeViewFactory } from '~src/features/regions-tree-view'

import { ClientAnalyticsByYearFactory, ClientPlotsFactory, ClientShortCard } from '~src/entities/client'
import { RegionsAnalyticsByYearFactory } from '~src/entities/region'
import { sessionModel } from '~src/entities/session'

import * as model from './model'

type MapSidebarProps = BoxProps

export function MapSidebar(props: MapSidebarProps) {
	const [isSidebarOpen, handleSidebarToggle] = useUnit([model.$isSidebarOpen, model.sidebarToggled])
	const [tabIndex, handleTabChange] = useUnit([model.$$tabs.$tab, model.$$tabs.tabChanged])

	return (
		<>
			<Box
				as='aside'
				pos={{ base: 'absolute', md: 'static' }}
				top={{ base: isSidebarOpen ? 'calc(-100% - 4rem)' : '0', md: '0' }}
				left={{ base: '0', md: '0' }}
				zIndex='sticky'
				w={{ base: 'full', md: isSidebarOpen ? '600px' : '0' }}
				h='full'
				bgColor='white'
				overflow='hidden'
				borderColor='blackAlpha.500'
				borderRightWidth='1px'
				transition='top 0.3s ease'
				{...props}
			>
				<Tabs
					index={tabIndex}
					onChange={handleTabChange}
					isLazy
					isFitted
					h='full'
					display='flex'
					flexGrow='1'
					flexDirection='column'
				>
					<TabList>
						<Tab>
							<Icon as={BsListUl} fontSize='xl' />
						</Tab>
						<Tab>
							<Icon as={TbPresentationAnalytics} fontSize='xl' />
						</Tab>
						<Tab>
							<Icon as={GrCircleInformation} fontSize='xl' />
						</Tab>
					</TabList>
					<TabPanels minH='0'>
						<TabPanel h='full' overflow='auto'>
							<ListTabPanel />
						</TabPanel>
						<TabPanel h='full' overflow='auto'>
							<AnalyticTabPanel />
						</TabPanel>
						<TabPanel h='full' overflow='auto'>
							<InformationTabPanel />
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Box>

			<Button
				minH={{ base: 'unset', md: '100%' }}
				position={{ base: 'absolute', md: 'unset' }}
				size={{ base: 'md', md: 'xs' }}
				left={{ base: '1', md: 'unset' }}
				bottom={{ base: '1', md: 'unset' }}
				zIndex='sticky'
				colorScheme='blue'
				rounded={{ base: 'full', md: 'none' }}
				onClick={() => handleSidebarToggle()}
			>
				{isSidebarOpen ? <ArrowLeftIcon /> : <ArrowRightIcon />}
			</Button>
		</>
	)
}

function ListTabPanel() {
	return (
		<Flex direction='column' w='full' h='full' overflowY='auto'>
			<RegionsTreeViewFactory.RegionsTreeView model={model.$$regionsTreeView} />
		</Flex>
	)
}

function AnalyticTabPanel() {
	return (
		<Box gap='4'>
			<Box minH='0'>
				<Text fontSize='xl' fontWeight='bold'>
					Аналитика по областям
				</Text>
				<Box minH='0'>
					<Box overflow='auto' h='full'>
						<RegionsAnalyticsByYearFactory.RegionsAnalyticsByYear model={model.$$regionsAnalyticsByYear} allowToggle />
					</Box>
				</Box>
			</Box>
			<Box minH='0'>
				<Text fontSize='xl' fontWeight='bold'>
					Аналитика по клиенту
				</Text>
				<Box minH='0'>
					<Box overflow='auto' h='full'>
						<ClientAnalyticsByYearFactory.ClientAnalyticsByYear model={model.$$clientAnalyticsByYear} allowToggle />
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

function InformationTabPanel() {
	const [handleClientLandClick, handleClientPlotClick] = useUnit([
		model.$$clientsLandToClientLand.landClicked,
		model.$$clientPlotsToClientPlot.landClicked,
	])
	const [clients] = useUnit([model.$$clientsPlotsInCircle.$circlesClients])
	const [favoriteClients] = useUnit([sessionModel.$session.map((session) => (session ? session.favoriteClients : []))])
	const [selectClients, setSelectClients] = React.useState<number[]>([])

	const handleClientClick = (clientId: number) => {
		if (selectClients.includes(clientId)) {
			setSelectClients(selectClients.filter((id) => id !== clientId))
		} else {
			setSelectClients([...selectClients, clientId])
		}
	}

	const handleAddClick = () => {
		sessionModel.favoriteClientsAdded(selectClients)
		setSelectClients([])
	}

	return (
		<Tabs>
			<TabList>
				<Tab>Клиент</Tab>
				<Tab>Отфильтрованные клиенты</Tab>
			</TabList>
			<TabPanels position='relative' h='full'>
				<TabPanel>
					<ClientPlotsFactory.ClientPlots
						model={model.$$clientPlots}
						onPlotClick={({ plotId }) => handleClientPlotClick(plotId)}
						h='full'
					/>
				</TabPanel>
				<TabPanel>
					<Box>
						<Stack gap='2' my='2'>
							{clients.length !== 0 ? (
								<>
									<Box
										w='full'
										position='sticky'
										top='-10px'
										zIndex='1'
										bgColor='blue.500'
										boxShadow='md'
										rounded='md'
										px='4'
										py='2'
									>
										<Stack direction='row' color='white'>
											<Text fontSize='md' fontWeight='medium'>
												Отфильтрованных клиентов:
											</Text>
											<b>{clients.length}</b>
										</Stack>
									</Box>

									{clients.map((client, index) => (
										<React.Fragment key={index}>
											<ClientShortCard client={client} onClick={() => handleClientLandClick(client.clientId)}>
												<Stack
													direction='row'
													justify='space-between'
													align='center'
													bgColor='yellow.500'
													color='white'
													rounded='md'
													px='4'
													py='1'
												>
													<Text>Добавить в избранное</Text>
													<Checkbox
														onChange={() => handleClientClick(client.clientId)}
														colorScheme='whiteAlpha'
														isChecked={
															favoriteClients.includes(client.clientId) || selectClients.includes(client.clientId)
														}
														isDisabled={favoriteClients.includes(client.clientId)}
													/>
												</Stack>
											</ClientShortCard>
										</React.Fragment>
									))}
									<Box
										w='full'
										position='sticky'
										bottom='-10px'
										zIndex='1'
										bgColor='blue.500'
										boxShadow='md'
										rounded='md'
										px='4'
										py='2'
									>
										<Stack direction='row' justify='space-between' align='center'>
											<Stack>
												<Stack direction='row' color='white'>
													<Text fontSize='md' fontWeight='medium'>
														Выбранно клиентов:
													</Text>
													<Text>{selectClients.length}</Text>
												</Stack>
												<Stack direction='row' color='white'>
													<Text>Добавить всех:</Text>
													<Checkbox
														isChecked={selectClients.length === clients.length}
														onChange={(e) =>
															e.target.checked
																? setSelectClients(clients.map((client) => client.clientId))
																: setSelectClients([])
														}
														colorScheme='whiteAlpha'
													/>
												</Stack>
											</Stack>
											<Button size='sm' colorScheme='yellow' color='white' onClick={handleAddClick}>
												<StarIcon />
											</Button>
										</Stack>
									</Box>
								</>
							) : (
								<Center>Пусто</Center>
							)}
						</Stack>
					</Box>
				</TabPanel>
			</TabPanels>
		</Tabs>
	)
}
