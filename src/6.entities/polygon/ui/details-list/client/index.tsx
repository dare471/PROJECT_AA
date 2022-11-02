import { memo, useCallback, useRef } from 'react'
import { CellMeasurerCache } from 'react-virtualized'
import { useQueryParam } from 'use-query-params'

import { TModals } from '@/4.widgets/modals'

import { TClientPolygon, TPolygonType } from '@/7.shared/api'
import { TSetState } from '@/7.shared/lib/react'
import { Load, VirtualAutoSizer, VirtualCellMeasurer, VirtualList } from '@/7.shared/ui'

import { ClientPolygonDetails } from './item'
import './styles.scss'

type TClientPolygonsDetailsListProps = {
	data?: TClientPolygon[]
	loading?: boolean
	setModal: TSetState<TModals | undefined>
	setIllustrate: TSetState<TPolygonType | undefined>
}

export const ClientPolygonsDetailsList = memo((props: TClientPolygonsDetailsListProps) => {
	const { data, loading, setModal, setIllustrate } = props

	const [clientPolygonQP, setClientPolygonQP] = useQueryParam<number>('clientPolygon')
	const cache = useRef(
		new CellMeasurerCache({
			defaultHeight: 200,
			fixedWidth: true
		})
	)

	const handleClickView = useCallback((item: any) => {
		setIllustrate('clientPolygon')
		setClientPolygonQP(item.id)
	}, [])

	const handleClickComment = useCallback((item: any, index: number) => {
		// setIllustrate('clientPolygon')
		setClientPolygonQP(item.id)

		setModal({
			type: 'comment',
			data: { header: { name: item.name, address: item.address }, info: item, index }
		})
	}, [])

	return (
		<>
			{loading ? (
				<Load />
			) : data && data.length > 0 ? (
				<VirtualAutoSizer>
					{({ width, height }) => {
						return (
							<VirtualList
								className='client_details_list'
								width={width}
								height={height}
								rowHeight={cache.current.rowHeight}
								deferredMeasurementCache={cache.current}
								rowCount={data.length}
								overscanRowCount={2}
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
										<ClientPolygonDetails
											data={data[index]}
											index={index}
											style={style}
											clientPolygonQP={clientPolygonQP}
											handleClickComment={handleClickComment}
											handleClickView={handleClickView}
										/>
									</VirtualCellMeasurer>
								)}
							/>
						)
					}}
				</VirtualAutoSizer>
			) : data && data.length === 0 ? (
				<div>Нету данных по Полигонам клиента</div>
			) : null}
		</>
	)
})
