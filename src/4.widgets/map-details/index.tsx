// import { memo } from 'react'
// import { useQueryParam } from 'use-query-params'

// import { ClientPolygonsDetailsList, DistrictPolygonsDetailsList } from '@/6.entities/polygon'

// import { TClientPolygon, TDistrictPolygon, TPolygonType } from '@/7.shared/api'
// import { TSetState } from '@/7.shared/lib/react'
// import { Article, Collapse } from '@/7.shared/ui'

// import { TModals } from '../modals'
// import { getUniqDetails } from './lib'

// type TMapDetailsProps = {
// 	clientPolygonsDetails?: TClientPolygon[]
// 	districtPolygonsDetails?: TDistrictPolygon[]
// 	setModal: TSetState<TModals | undefined>
// 	setIllustrate: TSetState<TPolygonType | undefined>
// }

// export const MapDetails = memo((props: TMapDetailsProps) => {
// 	const { clientPolygonsDetails, districtPolygonsDetails, setModal, setIllustrate } = props

// 	const [illustrateQP] = useQueryParam<TPolygonType>('illustrate')

// 	return (
// 		<Article className='details_article'>
// 			<div className='details'>
// 				{illustrateQP === 'district' && (
// 					<>
// 						{districtPolygonsDetails && (
// 							<datalist className='details_list'>
// 								{districtPolygonsDetails && (
// 									<DistrictPolygonsDetailsList
// 										data={getUniqDetails(districtPolygonsDetails)}
// 										setIllustrate={setIllustrate}
// 									/>
// 								)}
// 							</datalist>
// 						)}
// 					</>
// 				)}

// 				{(illustrateQP === 'clientPolygons' || illustrateQP === 'clientPolygon') && (
// 					<>
// 						{clientPolygonsDetails && (
// 							<>
// 								<div className='map_details_header_wrapper'>
// 									<header className='map_details_header'>
// 										<Collapse
// 											label='Подробнее'
// 											classNameButton='map_more_details_header_button'
// 											collapseConfig={{ duration: 300 }}
// 										>
// 											<div className='map_more_details_header_section'>
// 												<h3 className='map_more_details_header_title first'>{clientPolygonsDetails[0].name}</h3>
// 												<h5 className='map_more_details_header_title second'>{clientPolygonsDetails[0].address}</h5>
// 											</div>
// 										</Collapse>
// 									</header>
// 								</div>
// 								<datalist className='details_list'>
// 									<ClientPolygonsDetailsList
// 										data={clientPolygonsDetails}
// 										setIllustrate={setIllustrate}
// 										setModal={setModal}
// 									/>
// 								</datalist>
// 							</>
// 						)}
// 					</>
// 				)}
// 			</div>
// 		</Article>
// 	)
// })
