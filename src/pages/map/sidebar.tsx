import { AddIcon, ExternalLinkIcon, MinusIcon } from '@chakra-ui/icons'
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Badge,
	Box,
	type BoxProps,
	Button,
	Card,
	CardBody,
	Center,
	Checkbox,
	Icon,
	IconButton,
	Spinner,
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
import { BsGrid3X2 } from 'react-icons/bs'

import { ClientFavoriteFactory } from '~src/entities/client'

import * as model from './model'

interface MapSidebarProps extends BoxProps {
	[key: string]: any
}

export function MapSidebar(props: MapSidebarProps) {
	const [isSidebarOpen, handleSidebarClick] = useUnit([model.$isSidebarOpen, model.sidebarClicked])
	const [clientsInfo, clientInfo] = useUnit([model.$clientsInfo, model.$clientInfo])

	return (
		<>
			<Box
				display={{ base: 'none', md: 'unset' }}
				as='aside'
				pos='static'
				top='0'
				left='0'
				zIndex='sticky'
				w={isSidebarOpen ? '600px' : '0'}
				h='full'
				maxH='calc(100vh - 4rem)'
				pb='70px'
				overflowX='hidden'
				overflowY='auto'
				bgColor='whiteAlpha.700'
				borderColor='blackAlpha.500'
				borderRightWidth='1px'
				// transition='width 0.1s ease'
				{...props}
			>
				<Tabs isFitted isLazy colorScheme='blue'>
					<TabList position='sticky' top='0' left='0' zIndex='banner' bgColor='white'>
						<Tab>Список</Tab>
						<Tab>Аналитика</Tab>
						<Tab isDisabled={!clientInfo && clientsInfo.length === 0}>Информация</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<ListTabPanel />
						</TabPanel>
						<TabPanel>
							<AnalyticTabPanel />
						</TabPanel>
						<TabPanel>
							<InformationTabPanel />
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Box>

			<Button
				display={{ base: 'none', md: 'flex' }}
				// w={isSidebarOpen ? '380px' : '20'}
				size='lg'
				isActive={isSidebarOpen}
				transition='width 0.35s ease'
				colorScheme='blue'
				boxShadow='md'
				position='absolute'
				bottom='15px'
				left='10px'
				zIndex='sticky'
				onClick={() => handleSidebarClick()}
			>
				<BsGrid3X2 />
			</Button>
		</>
	)
}

function ListTabPanel() {
	const [regions, regionId, handleRegionClick] = useUnit([model.$regions, model.$regionId, model.regionSettled])
	const [districts, districtsPending, districtId, handleDistrictClick] = useUnit([
		model.$districts,
		model.$districtsPending,
		model.$districtId,
		model.districtSettled,
	])

	return (
		<>
			<Stack>
				{regions.map((region, index) => (
					<React.Fragment key={index}>
						<Button
							w='full'
							justifyContent='space-between'
							variant='outline'
							colorScheme='blue'
							onClick={() => handleRegionClick(Number(region.id))}
							isActive={Number(region.id) === regionId}
							isLoading={Number(region.id) === regionId && districtsPending}
						>
							<Text overflowWrap='break-word'>{region.name}</Text>
							{Number(region.id) === regionId ? <MinusIcon boxSize='3' /> : <AddIcon boxSize='3' />}
						</Button>

						{Number(region.id) === regionId && (
							<Stack pl='5'>
								{districts.map((district, index) => (
									<Button
										key={index}
										w='full'
										justifyContent='space-between'
										variant='outline'
										colorScheme='blue'
										onClick={() => handleDistrictClick(Number(district.id))}
										isActive={Number(district.id) === districtId}
										isLoading={Number(district.id) === districtId}
									>
										<Text overflowWrap='break-word'>{district.name}</Text>
										{Number(district.id) === districtId ? <MinusIcon boxSize='3' /> : <AddIcon boxSize='3' />}
									</Button>
								))}
							</Stack>
						)}
					</React.Fragment>
				))}
			</Stack>
		</>
	)
}

function InformationTabPanel() {
	const [clientsInfo, clientsInfoPending] = useUnit([model.$clientsInfo, model.$clientsInfoPending])
	const [clientInfo, clientPlots, clientInfoPending] = useUnit([
		model.$clientInfo,
		model.$clientPlots,
		model.$clientPlotsPending,
	])
	const [selectClients, handleClientSelect, handleAllClientSelect] = useUnit([
		model.clientsFavoriteModel.$selectedClients,
		model.clientsFavoriteModel.clientSelected,
		model.clientsFavoriteModel.allClientSelected,
	])
	const [viewInfo, setViewInfo] = React.useState<'clientsInfo' | 'clientInfo'>('clientsInfo')

	if (clientInfoPending || clientsInfoPending) {
		return (
			<Center>
				<Spinner />
			</Center>
		)
	}

	return (
		<Stack position='relative' h='full'>
			<Button
				colorScheme='blue'
				variant='outline'
				onClick={() => setViewInfo((prev) => (prev === 'clientInfo' ? 'clientsInfo' : 'clientInfo'))}
			>
				{viewInfo === 'clientInfo' ? 'Информация по килентам' : 'Информация по клиенту'}
			</Button>

			{viewInfo === 'clientInfo' && clientInfo ? (
				<>
					<Accordion allowToggle position='sticky' top='10' zIndex='1'>
						<AccordionItem>
							<h2>
								<AccordionButton bgColor='blue.500' _hover={{ bgColor: 'blue.600' }} rounded='md'>
									<Box as='span' flex='1' textAlign='left' color='white'>
										Основная информация
									</Box>
									<AccordionIcon color='white' />
								</AccordionButton>
							</h2>
							<AccordionPanel>
								<Card bgColor='blue.500' color='white'>
									<CardBody>
										<Stack>
											<Box>
												{clientInfo.guid === 1 ? (
													<Badge colorScheme='green'>Постоянный</Badge>
												) : (
													<Badge colorScheme='red'>Новый</Badge>
												)}
											</Box>
											<Box display='flex' flexWrap='wrap' gap='1' alignItems='center'>
												<Text fontSize='lg' fontWeight='bold'>
													Имя:
												</Text>
												<Text fontSize='md'>{clientInfo.clientName}</Text>
											</Box>
											<Box display='flex' flexWrap='wrap' gap='1' alignItems='center'>
												<Text fontSize='lg' fontWeight='bold'>
													Адрес:
												</Text>
												<Text fontSize='md'>{clientInfo.clientAddress}</Text>
											</Box>
											<Box display='flex' flexWrap='wrap' gap='1' alignItems='center'>
												<Text fontSize='lg' fontWeight='bold'>
													Иин:
												</Text>
												<Text fontSize='md'>{clientInfo.clientBin}</Text>
											</Box>
											<Box display='flex' flexWrap='wrap' gap='1' alignItems='center'>
												<Text fontSize='lg' fontWeight='bold'>
													Деятельность:
												</Text>
												<Text fontSize='md'>{clientInfo.clientActivity}</Text>
											</Box>
											<Stack direction='row' justify='end' align='center'>
												<ClientFavoriteFactory.ClientFavoriteButton
													model={model.clientFavoriteModel}
													isMulti={false}
													clientId={clientInfo.clientId}
												/>
												<IconButton
													aria-label='перейти на клиента'
													variant='solid'
													colorScheme='gray'
													size='sm'
													onClick={
														() => console.log('lol')
														// navigate(routes.clientProfile.route({ id: clientPlots.clientId, tab: 'infos' }))
													}
												>
													<Icon as={ExternalLinkIcon} color='blue.500' />
												</IconButton>
											</Stack>
										</Stack>
									</CardBody>
								</Card>
							</AccordionPanel>
						</AccordionItem>
					</Accordion>
					<Stack overflowY='auto'>
						{clientPlots.map((plot, index) => (
							<Card key={index} variant='filled' cursor='pointer'>
								<CardBody>
									<Stack>
										<Box display='flex' flexWrap='wrap' gap='1' alignItems='center'>
											<Text fontSize='lg' fontWeight='bold'>
												Название:
											</Text>
											<Text fontSize='md'>{plot.plotName}</Text>
										</Box>
										<Box display='flex' flexWrap='wrap' gap='1' alignItems='center'>
											<Text fontSize='lg' fontWeight='bold'>
												Культура:
											</Text>
											<Text fontSize='md'>{plot.plotCultName}</Text>
										</Box>
										<Box display='flex' flexWrap='wrap' gap='1' alignItems='center'>
											<Text fontSize='lg' fontWeight='bold'>
												Обьем:
											</Text>
											<Text fontSize='md'>{plot.plotArea}</Text>
										</Box>
									</Stack>
								</CardBody>
							</Card>
						))}
					</Stack>
				</>
			) : viewInfo === 'clientsInfo' && clientsInfo.length !== 0 ? (
				<>
					<Stack position='relative' h='full'>
						<Stack w='full' direction='row' position='sticky' top='5%' zIndex='1' bgColor='white'>
							<Text fontWeight='bold' fontSize='md'>
								Количество отфильтрованных клиентов:
							</Text>
							<Text fontSize='sm'>{clientsInfo.length}</Text>
						</Stack>
						{clientsInfo.map((clientInfo, index) => (
							<Card key={index}>
								<CardBody>
									<Stack>
										<Stack direction='row' justify='space-between' align='center'>
											{clientInfo.guid ? (
												<Badge colorScheme='green'>Постоянный</Badge>
											) : (
												<Badge colorScheme='red'>Новый</Badge>
											)}
											<Checkbox
												size='md'
												isChecked={selectClients.includes((clientInfo as any).id)}
												onChange={() => handleClientSelect((clientInfo as any).id)}
											/>
										</Stack>
										<Box display='flex' flexWrap='wrap' gap='1' alignItems='center'>
											<Text fontSize='lg' fontWeight='bold'>
												Название:
											</Text>
											<Text fontSize='md'>{(clientInfo as any).name}</Text>
										</Box>
										<Box display='flex' flexWrap='wrap' gap='1' alignItems='center'>
											<Text fontSize='lg' fontWeight='bold'>
												Иин:
											</Text>
											<Text fontSize='md'>{(clientInfo as any).iinBin}</Text>
										</Box>
										<Box display='flex' flexWrap='wrap' gap='1' alignItems='center'>
											<Text fontSize='lg' fontWeight='bold'>
												Деятельность:
											</Text>
											<Text fontSize='md'>{(clientInfo as any).activity}</Text>
										</Box>
										<Stack direction='row' justify='end' align='center'>
											<IconButton
												aria-label='перейти на клиента'
												variant='solid'
												colorScheme='gray'
												size='sm'
												onClick={
													() => console.log('lol')
													// navigate(routes.clientProfile.route({ id: clientPlots.clientId, tab: 'infos' }))
												}
											>
												<Icon as={ExternalLinkIcon} color='blue.500' />
											</IconButton>
										</Stack>
									</Stack>
								</CardBody>
							</Card>
						))}
						<Stack direction='row' align='center'>
							<Checkbox
								isChecked={selectClients.length === clientsInfo.length}
								onChange={(e) => handleAllClientSelect(clientsInfo.map((clientInfo) => (clientInfo as any).id))}
							/>
							<Stack direction='row' align='center'>
								<Text>Количество выбранных клиентов:</Text>
								<Text>{selectClients.length}</Text>
							</Stack>
						</Stack>

						<Stack>
							<ClientFavoriteFactory.ClientFavoriteButton
								model={model.clientsFavoriteModel}
								isMulti
								clientId={undefined}
							/>
						</Stack>
					</Stack>
				</>
			) : (
				<Center>Нету данных</Center>
			)}
		</Stack>
	)
}

function AnalyticTabPanel() {
	return (
		<Stack>
			<Stack>
				<Text fontSize='2xl' fontWeight='bold' color='blue.500'>
					Аналитика региона
				</Text>
				<RegionAnalytics />
			</Stack>
			<Stack>
				<Text fontSize='2xl' fontWeight='bold' color='blue.500'>
					Аналитика клиента
				</Text>
				<ClientAnalytics />
			</Stack>
		</Stack>
	)
}

function RegionAnalytics() {
	const [regionsAnalytics, regionsAnalyticsPending] = useUnit([model.$regionsAnalytics, model.$regionsAnalyticsPending])

	if (regionsAnalyticsPending) {
		return (
			<Center>
				<Spinner />
			</Center>
		)
	}

	if (regionsAnalytics.length === 0) {
		return (
			<Center>
				<Text>Пусто</Text>
			</Center>
		)
	}

	return (
		<Accordion allowToggle w='full'>
			{regionsAnalytics.map((regionAnalytics, index) => (
				<AccordionItem key={index}>
					<h2>
						<AccordionButton bgColor='blue.500' _hover={{ bgColor: 'blue.600' }} rounded='md'>
							<Box as='span' flex='1' textAlign='left' color='white'>
								{regionAnalytics.year}
							</Box>
							<AccordionIcon color='white' />
						</AccordionButton>
					</h2>

					<AccordionPanel>
						<Stack>
							{regionAnalytics.analytics.map((analytics, index) => (
								<Card key={index} bgColor='blue.500' color='white'>
									<CardBody>
										<Box display='flex' flexWrap='wrap' gap='1' alignItems='center'>
											<Text fontWeight='bold' fontSize='2xl' color='blue.100'>
												{analytics.regionName}
											</Text>
										</Box>
										<Box display='flex' flexWrap='wrap' gap='1' alignItems='center'>
											<Text fontSize='lg' fontWeight='bold'>
												Количество клиентов в Области:
											</Text>
											<Text fontSize='md'>{analytics.clientCountAll.toLocaleString()}</Text>
										</Box>
										<Box display='flex' flexWrap='wrap' gap='1' alignItems='center'>
											<Text fontSize='lg' fontWeight='bold'>
												Площадь клиентов в области:
											</Text>
											<Text fontSize='md'>{analytics.clientAreaAll.toLocaleString()}</Text>
										</Box>
										<Box display='flex' flexWrap='wrap' gap='1' alignItems='center'>
											<Text fontSize='lg' fontWeight='bold'>
												Доля количества клиентов (АА):
											</Text>
											<Text fontSize='md'>{analytics.clientProcAA.toLocaleString()}%</Text>
										</Box>
										<Box display='flex' flexWrap='wrap' gap='1' alignItems='center'>
											<Text fontSize='lg' fontWeight='bold'>
												Доля количества клиентов (Конкуренты):
											</Text>
											<Text fontSize='md'>{analytics.clientProcOth.toLocaleString()}%</Text>
										</Box>
										<Box display='flex' flexWrap='wrap' gap='1' alignItems='center'>
											<Text fontSize='lg' fontWeight='bold'>
												Количество клиентов АА:
											</Text>
											<Text fontSize='md'>{analytics.clientCountAA.toLocaleString()}</Text>
										</Box>
										<Box display='flex' flexWrap='wrap' gap='1' alignItems='center'>
											<Text fontSize='lg' fontWeight='bold'>
												Количество клиентов (Конкуренты):
											</Text>
											<Text fontSize='md'>{analytics.clientCountOth.toLocaleString()}</Text>
										</Box>
										<Box display='flex' flexWrap='wrap' gap='1' alignItems='center'>
											<Text fontSize='lg' fontWeight='bold'>
												Доля площади (АА):
											</Text>
											<Text fontSize='md'>{analytics.clientAreaAAProc.toLocaleString()}%</Text>
										</Box>
										<Box display='flex' flexWrap='wrap' gap='1' alignItems='center'>
											<Text fontSize='lg' fontWeight='bold'>
												Доля площади (Конкуренты):
											</Text>
											<Text fontSize='md'>{analytics.clientAreaOthProc.toLocaleString()}%</Text>
										</Box>
										<Box display='flex' flexWrap='wrap' gap='1' alignItems='center'>
											<Text fontSize='lg' fontWeight='bold'>
												Площадь клиентов (АА):
											</Text>
											<Text fontSize='md'>{analytics.clientAreaAA.toLocaleString()}</Text>
										</Box>
										<Box display='flex' flexWrap='wrap' gap='1' alignItems='center'>
											<Text fontSize='lg' fontWeight='bold'>
												Площадь клиентов (Конкурентов):
											</Text>
											<Text fontSize='md'>{analytics.clientAreaOth.toLocaleString()}</Text>
										</Box>
									</CardBody>
								</Card>
							))}
						</Stack>
					</AccordionPanel>
				</AccordionItem>
			))}
		</Accordion>
	)
}

function ClientAnalytics() {
	const [clientAnalytics, clientAnalyticsPending] = useUnit([model.$clientAnalytics, model.$clientAnalyticsPending])

	if (clientAnalyticsPending) {
		return (
			<Center>
				<Spinner />
			</Center>
		)
	}

	if (clientAnalytics.length === 0) {
		return (
			<Center>
				<Text>Пусто</Text>
			</Center>
		)
	}

	return (
		<Accordion allowToggle w='full'>
			{clientAnalytics.map((clientAnalytic, index) => (
				<AccordionItem key={index}>
					<h2>
						<AccordionButton bgColor='blue.500' _hover={{ bgColor: 'blue.600' }} rounded='md'>
							<Box as='span' flex='1' textAlign='left' color='white'>
								{clientAnalytic.year}
							</Box>
							<AccordionIcon color='white' />
						</AccordionButton>
					</h2>

					<AccordionPanel>
						<Stack>
							{clientAnalytic.analytics.map((analytics, index) => (
								<Card key={index} bgColor='blue.500' color='white'>
									<CardBody>
										<Box display='flex' flexWrap='wrap' gap='1' alignItems='center'>
											<Text fontWeight='bold' fontSize='2xl' color='blue.100'>
												{analytics.productName}
											</Text>
										</Box>
										<Box display='flex' flexWrap='wrap' gap='1' alignItems='center'>
											<Text fontSize='lg' fontWeight='bold'>
												Сумма субссидий клиента:
											</Text>
											<Text fontSize='md'>{analytics.sumSubsClient.toLocaleString()}</Text>
										</Box>
										<Box display='flex' flexWrap='wrap' gap='1' alignItems='center'>
											<Text fontSize='lg' fontWeight='bold'>
												Сумма субссидий региона:
											</Text>
											<Text fontSize='md'>{analytics.foreignMarkSumSubcides.toLocaleString()}</Text>
										</Box>
										<Box display='flex' flexWrap='wrap' gap='1' alignItems='center'>
											<Text fontSize='lg' fontWeight='bold'>
												Доля клиента от рынка:
											</Text>
											<Text fontSize='md'>{analytics.percentSubs.toLocaleString()}%</Text>
										</Box>
										<Box display='flex' flexWrap='wrap' gap='1' alignItems='center'>
											<Text fontSize='lg' fontWeight='bold'>
												Объем закупа:
											</Text>
											<Text fontSize='md'>{analytics.sumVolumeClient.toLocaleString()}</Text>
										</Box>
										<Box display='flex' flexWrap='wrap' gap='1' alignItems='center'>
											<Text fontSize='lg' fontWeight='bold'>
												Объем закупа рынка:
											</Text>
											<Text fontSize='md'>{analytics.foreignMarkSumVolume.toLocaleString()}</Text>
										</Box>
										<Box display='flex' flexWrap='wrap' gap='1' alignItems='center'>
											<Text fontSize='lg' fontWeight='bold'>
												Доля клиента от рынка (в объеме):
											</Text>
											<Text fontSize='md'>{analytics.percentVolume.toLocaleString()}%</Text>
										</Box>
										<Box display='flex' flexWrap='wrap' gap='1' alignItems='center'>
											<Text fontSize='lg' fontWeight='bold'>
												Культура:
											</Text>
											<Text fontSize='md'>{analytics.culture}</Text>
										</Box>
									</CardBody>
								</Card>
							))}
						</Stack>
					</AccordionPanel>
				</AccordionItem>
			))}
		</Accordion>
	)
}
