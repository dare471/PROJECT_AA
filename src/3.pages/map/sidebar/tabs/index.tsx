// import { FC } from 'react'
// import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
// import { MapRightSidebar } from '@/3.pages/map/sidebar/right'
// import { MapLeftSidebar } from '@/4.widgets/map-list'
// import { IMapTabsProps } from './types'

// export const MapTabs: FC<IMapTabsProps> = ({
// 	illustrate,
// 	setIllustrate,
// 	listPolygons,
// 	clientInfo,
// 	setModal,
// 	handlePrev
// }) => {
// 	return (
// 		<Tabs>
// 			<TabList>
// 				<Tab>Список</Tab>
// 				<Tab>Инфа</Tab>
// 			</TabList>

// 			<TabPanel>
// 				<MapLeftSidebar
// 					illustrate={illustrate}
// 					setIllustrate={setIllustrate}
// 					listPolygons={listPolygons}
// 					handlePrev={handlePrev}
// 				/>
// 			</TabPanel>
// 			<TabPanel>
// 				<MapRightSidebar clientInfo={clientInfo} setIllustrate={setIllustrate} setModal={setModal} />
// 			</TabPanel>
// 		</Tabs>
// 	)
// }
