import { FC, ReactNode } from 'react'

import { TModals } from '@/4.widgets/modals'

import {
	ClientPolygonsDetailsList,
	DescribePolygonsList,
	DistrictPolygonsDetailsList,
	TListPolygons
} from '@/6.entities/polygon'

import { TClientPolygon, TDistrictPolygon, TPolygonType } from '@/7.shared/api'
import { TSetState } from '@/7.shared/lib/react'
import { Article, Collapse } from '@/7.shared/ui'

import './styles.scss'

type TMapTabContentSubComponents = {
	Describe: typeof DescribePolygons
	DistrictDetails: typeof DistrictPolygonsDetails
	ClientDetails: typeof ClientPolygonsDetails
}

type TMapTabContentProps = {
	children: ReactNode
	visible?: boolean
}

export const MapTabContent: FC<TMapTabContentProps> & TMapTabContentSubComponents = ({ visible = true, children }) => {
	return (
		<Article className={`map_tab_content_article${visible ? ' show' : ' hide'}`}>{visible && <>{children}</>}</Article>
	)
}

type TDescribePolygonsProps = {
	data?: TListPolygons[]
	loading?: boolean
	illustrate?: TPolygonType
	setIllustrate: TSetState<TPolygonType | undefined>
}

const DescribePolygons = ({ data, loading, illustrate, setIllustrate }: TDescribePolygonsProps) => (
	<DescribePolygonsList data={data} loading={loading} illustrate={illustrate} setIllustrate={setIllustrate} />
)

type TDistrictPolygonsDetailsProps = {
	data?: TDistrictPolygon[]
	loading?: boolean
	setIllustrate: TSetState<TPolygonType | undefined>
}

const DistrictPolygonsDetails = ({ data, loading, setIllustrate }: TDistrictPolygonsDetailsProps) => (
	<DistrictPolygonsDetailsList data={data} loading={loading} setIllustrate={setIllustrate} />
)

type TClientPolygonsDetailsProps = {
	data?: TClientPolygon[]
	loading?: boolean
	setModal: TSetState<TModals | undefined>
	setIllustrate: TSetState<TPolygonType | undefined>
}

//FIXME: remove redundancy
const ClientPolygonsDetails = ({ data, loading, setIllustrate, setModal }: TClientPolygonsDetailsProps) => (
	<>
		<div className='map_details_header_wrapper'>
			<header className='map_details_header'>
				<Collapse label='Подробнее' classNameButton='map_more_details_header_button' collapseConfig={{ duration: 300 }}>
					<div className='map_more_details_header_section'>
						{data && (
							<>
								<h3 className='map_more_details_header_title first'>{data[0].name}</h3>
								<h5 className='map_more_details_header_title second'>{data[0].address}</h5>
							</>
						)}
					</div>
				</Collapse>
			</header>
		</div>
		<div className='map_details_list'>
			<ClientPolygonsDetailsList data={data} loading={loading} setIllustrate={setIllustrate} setModal={setModal} />
		</div>
	</>
)

MapTabContent.Describe = DescribePolygons
MapTabContent.DistrictDetails = DistrictPolygonsDetails
MapTabContent.ClientDetails = ClientPolygonsDetails
