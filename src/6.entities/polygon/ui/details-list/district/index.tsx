import { memo, useCallback, useRef } from 'react'
import { CellMeasurerCache } from 'react-virtualized'
import { useQueryParam } from 'use-query-params'

import { TDistrictPolygon, TPolygonType } from '@/7.shared/api'
import { TSetState } from '@/7.shared/lib/react'
import { Load, VirtualAutoSizer, VirtualCellMeasurer, VirtualList } from '@/7.shared/ui'

import { DistrictPolygonDetails } from './item'
import './styles.scss'

type TDistrictPolygonsDetailsListProps = {
	data?: TDistrictPolygon[]
	loading?: boolean
	setIllustrate: TSetState<TPolygonType | undefined>
}

export const DistrictPolygonsDetailsList = memo((props: TDistrictPolygonsDetailsListProps) => {
	const { data, loading, setIllustrate } = props

	const [clientPolygonsQP, setClientPolygonsQP] = useQueryParam('clientPolygons' as TPolygonType)
	const cache = useRef(
		new CellMeasurerCache({
			defaultHeight: 100,
			fixedWidth: true
		})
	)

	const handleClickView = useCallback((item: TDistrictPolygon) => {
		setIllustrate('clientPolygons')
		setClientPolygonsQP(item.client_info_id)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			{loading ? (
				<Load />
			) : data && data.length > 0 ? (
				<VirtualAutoSizer>
					{({ width, height }) => (
						<VirtualList
							className='district_details_list'
							width={width}
							height={height}
							deferredMeasurementCache={cache.current}
							overscanRowCount={2}
							rowCount={data.length}
							rowHeight={cache.current.rowHeight}
							rowRenderer={({ key, index, style, parent }) => (
								<VirtualCellMeasurer
									key={key}
									cache={cache.current}
									index={index}
									rowIndex={index}
									parent={parent}
									columnIndex={0}
									style={style}
								>
									<DistrictPolygonDetails
										data={data[index]}
										index={index}
										style={style}
										handleClickView={handleClickView}
									/>
								</VirtualCellMeasurer>
							)}
						/>
					)}
				</VirtualAutoSizer>
			) : data && data.length === 0 ? (
				<div>Нету данных по Полигонам Района</div>
			) : null}
		</>
	)
})
