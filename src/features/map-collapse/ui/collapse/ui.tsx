import { FC } from 'react'
import { IMapCollapseProps } from './types'
import { MapCollapseItem } from '../collapse-item'
import './styles.scss'

export const MapCollapse: FC<IMapCollapseProps> = ({ listPolygons, handleChangeCurrentPolygon }) => {
	return (
		<ul className='map_ul' role='menu'>
			{listPolygons &&
				listPolygons.data.map((item: any, index: number) => (
					<MapCollapseItem
						key={`${item}-${index}`}
						data={item}
						handleChangeCurrentPolygon={handleChangeCurrentPolygon}
					/>
				))}
		</ul>
	)
}
