import { useEffect, useState } from 'react'
import { TabList, TabPanel, Tabs } from 'react-tabs'

import { TModals } from '@/4.widgets/modals'

import { MapTabContent } from '@/5.features/map-tab-contents'

import { TListPolygons } from '@/6.entities/polygon'

import { TPolygonType } from '@/7.shared/api'
import { TSetState } from '@/7.shared/lib/react'
import { CustomTab, Templates } from '@/7.shared/ui'

import { MapSidebarHeader } from './header'
import { getUniqDetails } from './lib'
import './styles.scss'

type TMapSidebarProps = {
	handleMutation: any
	setModal: TSetState<TModals | undefined>
	listPolygons?: TListPolygons[]
	illustrate?: TPolygonType
	setIllustrate: TSetState<TPolygonType | undefined>
	handlePrev: any
}

export const MapSidebar = (props: TMapSidebarProps) => {
	const { handleMutation, illustrate, setIllustrate, listPolygons, setModal, handlePrev } = props
	const [districtPolygonMutation] = handleMutation('district')
	const [clientPolygonMutation] = handleMutation('clientPolygons')

	const [tabIndex, setTabIndex] = useState<number>(0)

	useEffect(() => {
		if (districtPolygonMutation.data || clientPolygonMutation.data) {
			setTabIndex(1)
		}
	}, [districtPolygonMutation, clientPolygonMutation])

	useEffect(() => {
		if (illustrate === 'district' || illustrate === 'clientPolygons') {
			setTabIndex(1)
		} else {
			setTabIndex(0)
		}
	}, [illustrate])

	return (
		<Templates.Sidebar visible={!!clientPolygonMutation.data} className='map_sidebar_content'>
			<MapSidebarHeader setIllustrate={setIllustrate} />
			<Tabs
				className='tabs'
				selectedIndex={tabIndex}
				onSelect={(index, lastIndex) => {
					setTabIndex(index)
				}}
				forceRenderTabPanel={true}
			>
				<div className='tab_list_wrapper'>
					<TabList className='tab_list'>
						<CustomTab id='lists'>Список</CustomTab>
						<CustomTab
							id='info'
							disabled={illustrate !== 'district' && illustrate !== 'clientPolygons' && illustrate !== 'clientPolygon'}
						>
							Детали
						</CustomTab>
					</TabList>
				</div>

				<TabPanel className={`tab_panel${tabIndex === 0 ? ` show` : ' hide'}`}>
					<MapTabContent visible>
						{listPolygons && (
							<MapTabContent.Describe
								data={listPolygons}
								loading={false}
								illustrate={illustrate}
								setIllustrate={setIllustrate}
							/>
						)}
					</MapTabContent>
				</TabPanel>
				<TabPanel className={`tab_panel${tabIndex === 1 ? ` show` : ' hide'}`}>
					<MapTabContent visible={illustrate === 'district'}>
						<MapTabContent.DistrictDetails
							data={getUniqDetails(districtPolygonMutation.data)}
							loading={districtPolygonMutation.isLoading}
							setIllustrate={setIllustrate}
						/>
					</MapTabContent>
					<MapTabContent visible={illustrate === 'clientPolygons' || illustrate === 'clientPolygon'}>
						<MapTabContent.ClientDetails
							data={clientPolygonMutation.data}
							loading={clientPolygonMutation.isLoading}
							setIllustrate={setIllustrate}
							setModal={setModal}
						/>
					</MapTabContent>
				</TabPanel>
			</Tabs>
		</Templates.Sidebar>
	)
}
