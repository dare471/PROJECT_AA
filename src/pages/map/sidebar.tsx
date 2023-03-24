import { ArrowLeftIcon, ArrowRightIcon, ExternalLinkIcon, StarIcon } from '@chakra-ui/icons'
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	type BoxProps,
	Button,
	Flex,
	Icon,
	Stack,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
} from '@chakra-ui/react'
import { useUnit } from 'effector-react'
import React from 'react'
import { BsListUl } from 'react-icons/bs'
import { GrCircleInformation } from 'react-icons/gr'
import { TbPresentationAnalytics } from 'react-icons/tb'
import { useNavigate } from 'react-router'

import { ClientAnalyticsByYearFactory } from '~src/features/client-analytics-by-year'
import { ClientsSelectFactory } from '~src/features/clients-select-cards'
import { MuchClientPlotsFactory } from '~src/features/much-client-plots'
import { RegionsTreeViewFactory } from '~src/features/regions-tree-view'

import { ClientCard } from '~src/entities/new-client'
import { RegionsAnalyticsByYearFactory } from '~src/entities/region'
import { $$session } from '~src/entities/session'

import { routes } from '~src/shared/routes'
import { Empty, Spin } from '~src/shared/ui'

import * as model from './model'

type MapSidebarProps = BoxProps

export function MapSidebar(props: MapSidebarProps) {
	const [isSidebarOpen, handleSidebarToggle] = useUnit([model.$isSidebarOpen, model.sidebarToggled])
	const [tab, handleTabChange] = useUnit([model.$$sidebarTabs.$tab, model.$$sidebarTabs.tabChanged])

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
					index={tab.index}
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
	const [client, clientPlotId, handleClientPlotClick] = useUnit([
		model.$$clientPlots.$client,
		model.$$clientPlotsToClientPlot.$landId,
		model.$$clientPlotsToClientPlot.landClicked,
	])
	const navigate = useNavigate()

	const [tab, handleTabChange] = useUnit([model.$$informationTabs.$tab, model.$$informationTabs.tabChanged])

	return (
		<Tabs index={tab.index} onChange={handleTabChange}>
			<TabList>
				<Tab>Клиент</Tab>
				<Tab>Фильтровнные</Tab>
			</TabList>
			<TabPanels position='relative' h='full'>
				<TabPanel>
					<Stack position='relative'>
						<Box position='sticky' top='0' zIndex='1' bgColor='white' shadow='md'>
							<Accordion allowToggle>
								<AccordionItem>
									<AccordionButton>
										<AccordionIcon />
										<Text>Клиент</Text>
									</AccordionButton>
									<AccordionPanel>
										<ClientCard variant='filled' {...client}>
											<Button onClick={() => navigate(routes.clientProfile({ clientId: client!.clientId.toString() }))}>
												<ExternalLinkIcon />
											</Button>
										</ClientCard>
									</AccordionPanel>
								</AccordionItem>
							</Accordion>
						</Box>
						<MuchClientPlotsFactory.MuchClientPlots
							model={model.$$clientPlots}
							onClick={({ plotId }) => handleClientPlotClick(plotId)}
							plotId={clientPlotId}
						/>
					</Stack>
				</TabPanel>
				<TabPanel>
					<ClientsSelect />
				</TabPanel>
			</TabPanels>
		</Tabs>
	)
}

function ClientsSelect() {
	const [clients, clientsPending, handleClientLandClick, handleAddClientsToFavorite] = useUnit([
		model.$$clientsPlotsInCircle.$circlesClients,
		model.$$clientsPlotsInCircle.$circlesClientsPending,
		model.$$clientsLandToClientLand.landClicked,
		model.addClientsToFavorite,
	])
	const [favoriteClientIds] = useUnit([$$session.$session.map((session) => session?.favoriteClients ?? [])])

	return (
		<Box>
			<Stack gap='2' my='2'>
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
								Отфильтрованно клиентов:
							</Text>
							<Text fontSize='md'>{clients.length}</Text>
						</Stack>
					</Box>

					<ClientsSelectFactory.ClientSelectCard
						model={model.$$clientsSelect}
						favoriteClientIds={favoriteClientIds}
						onSeeClick={({ clientId }) => handleClientLandClick(clientId)}
					/>
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
							<ClientsSelectFactory.AllClientsSelect model={model.$$clientsSelect} />
							<Button size='sm' colorScheme='yellow' color='white' onClick={handleAddClientsToFavorite}>
								<StarIcon />
							</Button>
						</Stack>
					</Box>
				</>
			</Stack>

			{clientsPending && <Spin />}
			{clients.length === 0 && !clientsPending && <Empty>Пусто</Empty>}
		</Box>
	)
}
