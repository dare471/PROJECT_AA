import { FC, memo } from 'react'
import { IMapCollapseProps } from './types'
import { MapCollapseItem } from '../collapse-item'
import './styles.scss'

export const MapCollapse: FC<IMapCollapseProps> = memo(({ listPolygons, illustrate }) => {
	return (
		<ul className='map_ul' role='menu'>
			{listPolygons &&
				listPolygons.map((item: any, index: number) => <MapCollapseItem illustrate={illustrate} key={`${item}-${index}`} data={item} />)}
		</ul>
	)
})
