import { memo } from 'react'

import { TSetState } from '@/7.shared/lib/react'
import { Load, VirtualAutoSizer, VirtualList } from '@/7.shared/ui'

import { TIin } from '../../model'
import { MapIinListItem } from './item'
import './styles.scss'

type TMapIinListProps = {
	data?: any
	loading?: boolean
	setIin: TSetState<TIin>
}

export const MapIinList = memo((props: TMapIinListProps) => {
	const { data, loading, setIin } = props

	return (
		<div className='map_iin_list'>
			{loading ? (
				<Load />
			) : data && data.length > 0 ? (
				<VirtualAutoSizer>
					{({ width, height }) => (
						<VirtualList
							role='ul'
							width={width}
							height={180}
							rowCount={data.length}
							rowHeight={30}
							rowRenderer={({ index, style }) => (
								<MapIinListItem data={data} index={index} style={style} setIin={setIin} />
							)}
						></VirtualList>
					)}
				</VirtualAutoSizer>
			) : data && data.length === 0 ? (
				<div>Список ИИН пустой</div>
			) : null}
		</div>
	)
})
