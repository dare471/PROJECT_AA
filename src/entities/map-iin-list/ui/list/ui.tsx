import { FC } from 'react'
import { FixedSizeList as List } from 'react-window'
import { IMapIinListProps } from './types'
import { MapIinListItem } from '../list-item'
import './styles.scss'

export const MapIinList: FC<IMapIinListProps> = ({ data, handleSelect }) => {
	return (
		<div className='map_iin_list'>
			<List width='100%' height={180} itemData={data} itemCount={data.length} itemSize={30} innerElementType='ul'>
				{({ data, index, style }) => (
					<MapIinListItem data={data} index={index} style={style} handleSelect={handleSelect} />
				)}
			</List>
		</div>
	)
}
