import { FC } from 'react'
import { IDropDown } from './types'
import { MapList } from '../list'
import { MapListRow } from '../row'
import './styles.scss'

export const DropDown: FC<IDropDown> = ({
	children,
	dropdown,
	illustratePolygons,
	activePolygon,
	initIndex,
	setInitIndex
}) => {
	return (
		<div style={{ inlineSize: '100%', blockSize: '100%' }}>
			<ul className={`dropdown ${dropdown ? 'show' : ''}`}>
				<MapList
					data={children}
					illustratePolygons={illustratePolygons}
					activePolygon={activePolygon}
					initIndex={initIndex}
					setInitIndex={setInitIndex}
				/>
			</ul>
		</div>
	)
}
