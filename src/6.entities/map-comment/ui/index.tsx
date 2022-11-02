import { useRef } from 'react'
import { CellMeasurerCache } from 'react-virtualized'

import { Load, VirtualAutoSizer, VirtualCellMeasurer, VirtualList, VirtualWindowScroller } from '@/7.shared/ui'

import { MapComment } from './item'

type TMapCommentsProps = {
	data?: any
	loading?: boolean
	id: string
}

export const MapComments = (props: TMapCommentsProps) => {
	const { data, loading, id } = props

	const cache = useRef(
		new CellMeasurerCache({
			defaultWidth: 200
		})
	)

	return (
		<>
			{loading ? (
				<Load />
			) : data && data.length > 0 ? (
				<VirtualWindowScroller>
					{({ height, onChildScroll, scrollTop, isScrolling, registerChild }) => (
						<VirtualAutoSizer disableHeight>
							{({ width }) => (
								<VirtualList
									ref={registerChild}
									autoHeight
									height={height}
									width={width}
									isScrolling={isScrolling}
									onScroll={onChildScroll}
									scrollTop={scrollTop}
									rowCount={data.length}
									rowHeight={cache.current.rowHeight}
									deferredMeasurementCache={cache.current}
									overscanRowCount={2}
									rowRenderer={({ key, index, isScrolling, isVisible, style, parent }) => (
										<VirtualCellMeasurer
											key={key}
											cache={cache.current}
											index={index}
											rowIndex={index}
											parent={parent}
											columnIndex={0}
											style={style}
										>
											<MapComment data={data[index]} index={index} style={style} />
										</VirtualCellMeasurer>
									)}
								/>
							)}
						</VirtualAutoSizer>
					)}
				</VirtualWindowScroller>
			) : data && data.length === 0 ? (
				<div>Список Комментриев пустой</div>
			) : null}
		</>
	)
}
