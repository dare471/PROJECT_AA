import { FC, memo, useEffect, useState } from 'react'
import { IMapCollapseProps, TListIllustrate } from './types'
import { MapCollapseItem } from './item'
import './styles.scss'

export const MapCollapse: FC<IMapCollapseProps> = memo(({ listPolygons, illustrate, setIllustrate }) => {
	const [listIllustrate, setListIllustrate] = useState<TListIllustrate>(null)

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
			<ul className='map_ul' role='menu'>
				{listPolygons &&
					listPolygons.map((item: any, index: number) => (
						<MapCollapseItem
							key={`${item}-${index}`}
							data={item}
							listIllustrate={listIllustrate}
							setListIllustrate={setListIllustrate}
						/>
					))}
			</ul>
		</div>
	)
})
