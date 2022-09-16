/* eslint-disable prefer-const */
import { FC, useEffect, useRef, useState } from 'react'
import { FixedSizeList as List } from 'react-window'
import { IPolygon } from '@/shared/api'
import { IMapListProps } from './types'
import { MapListRow } from '../row'
import './styles.scss'

export const MapList: FC<IMapListProps> = ({ data, illustratePolygons, activePolygon, initIndex, setInitIndex }) => {
	useEffect(() => {
		if (activePolygon) {
			const activeIndex = data.findIndex((item: IPolygon) =>
				item.properties?.TYPE_1
					? activePolygon.properties.GID_1 !== item.properties.GID_1
					: activePolygon.properties.GID_2 !== item.properties.GID_2
			)
			setInitIndex(prev => ({ ...prev, index: activeIndex }))
		}
	}, [data, activePolygon])

	return (
		<>
			<div className='map_ul'>
				<List height={500} width='100%' itemCount={data.length} itemSize={100} itemData={data} layout='vertical'>
					{({ data, index, style }) => (
						<MapListRow
							data={data}
							index={index}
							style={style}
							illustratePolygons={illustratePolygons}
							activePolygon={activePolygon}
							initIndex={initIndex}
							setInitIndex={setInitIndex}
						/>
					)}
				</List>
			</div>
		</>
	)
}
