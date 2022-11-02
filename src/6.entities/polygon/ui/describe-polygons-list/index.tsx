import { memo, useEffect, useState } from 'react'

import { TDistrictPolygon, TPolygonType, TRegionPolygon } from '@/7.shared/api'
import { TSetState } from '@/7.shared/lib/react'
import { Load } from '@/7.shared/ui'

import { DescribePolygonCollapse } from './item'
import './styles.scss'

export type TListPolygons = {
	children?: TListPolygons[]
} & (TRegionPolygon | TDistrictPolygon)

export type TListIllustrate = 'region' | 'district'

type TDescribePolygonsListProps = {
	data?: TListPolygons[]
	loading?: boolean
	illustrate?: TPolygonType
	setIllustrate: TSetState<TPolygonType | undefined>
}

export const DescribePolygonsList = memo((props: TDescribePolygonsListProps) => {
	const { data, loading, illustrate, setIllustrate } = props

	const [listIllustrate, setListIllustrate] = useState<TListIllustrate>()

	useEffect(() => {
		if (illustrate) {
			if (illustrate === 'region') {
				setListIllustrate('region')
			} else if (illustrate === 'district') {
				setListIllustrate('district')
			}
		}
	}, [illustrate])

	useEffect(() => {
		if (listIllustrate) {
			setIllustrate(listIllustrate)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [listIllustrate])

	return (
		<div className='map_collapse_wrapper'>
			{loading ? (
				<Load />
			) : data && data.length > 0 ? (
				<ul className='map_ul' role='menu'>
					{data.map((item, index) => (
						<DescribePolygonCollapse
							key={`${item}-${index}`}
							data={item}
							listIllustrate={listIllustrate}
							setListIllustrate={setListIllustrate}
						/>
					))}
				</ul>
			) : data && data.length === 0 ? (
				<div>Нету Списка областей и районов</div>
			) : null}
		</div>
	)
})
