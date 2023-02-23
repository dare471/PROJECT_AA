export const kek = ''
// import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
// import { Box, type BoxProps, Button, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
// import { useUnit } from 'effector-react'

// import * as model from './model'

// type MapPlayGroundSidebarProps = BoxProps

// export function MapPlayGroundSidebar(props: MapPlayGroundSidebarProps) {
// 	const [isSidebarOpen] = useUnit([model.$isSidebarOpen, model.sidebarClicked])
// 	const [tabIndex, handleTabChange] = useUnit([model.tabsModel.$tab, model.tabsModel.tabChanged])

// 	return (
// 		<>
// 			<Box
// 				as='aside'
// 				pos={{ base: 'absolute', md: 'static' }}
// 				top={{ base: isSidebarOpen ? '-100%' : '0', md: '0' }}
// 				left={{ base: '0', md: '0' }}
// 				zIndex='sticky'
// 				w={{ base: 'full', md: isSidebarOpen ? '600px' : '0' }}
// 				h='full'
// 				maxH='calc(100vh - 4rem)'
// 				pb='70px'
// 				overflowX='hidden'
// 				overflowY='auto'
// 				bgColor='white'
// 				borderColor='blackAlpha.500'
// 				borderRightWidth='1px'
// 				transition='top 0.3s ease'
// 				{...props}
// 			>
// 				<Tabs isFitted isLazy isManual isTruncated index={tabIndex} onChange={handleTabChange}>
// 					<TabList>
// 						<Tab>1</Tab>
// 						<Tab>2</Tab>
// 						<Tab>3</Tab>
// 					</TabList>
// 					<TabPanels>
// 						<TabPanel>1</TabPanel>
// 						<TabPanel>2</TabPanel>
// 						<TabPanel>3</TabPanel>
// 					</TabPanels>
// 				</Tabs>
// 			</Box>

// 			<SidebarButton />
// 		</>
// 	)
// }

// function SidebarButton() {
// 	const [isSidebarOpen, handleSidebarClick] = useUnit([model.$isSidebarOpen, model.sidebarClicked])

// 	return (
// 		<Button
// 			minH={{ base: 'unset', md: 'inherit' }}
// 			position={{ base: 'absolute', md: 'unset' }}
// 			size={{ base: 'md', md: 'xs' }}
// 			left={{ base: '1', md: 'unset' }}
// 			bottom={{ base: '1', md: 'unset' }}
// 			zIndex='sticky'
// 			colorScheme='blue'
// 			rounded={{ base: 'full', md: 'none' }}
// 			onClick={() => handleSidebarClick()}
// 		>
// 			{isSidebarOpen ? <ArrowLeftIcon /> : <ArrowRightIcon />}
// 		</Button>
// 	)
// }
