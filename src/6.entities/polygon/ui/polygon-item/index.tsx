import { FC } from 'react'
import { Polygon } from 'react-leaflet'
import { useQueryParam } from 'use-query-params'
import { IPolygonItemProps } from './types'

export const PolygonItem: FC<IPolygonItemProps> = ({ polygon, color, onClick }) => {
	// TODO: remove this wooden logic with option value
	const [illustrateDataQP, setIllustrateDataQP] = useQueryParam(
		`${!polygon.type ? 'clientPolygon' : polygon.type === 'polygon' ? 'client' : polygon.type}`
	)

	return (
		<div style={{ inlineSize: '100%', blockSize: '100%' }}>
			{polygon.GEOMETRY_RINGS && (
				<Polygon
					positions={polygon.GEOMETRY_RINGS}
					pathOptions={{ color: color instanceof Function ? color(polygon) : color }}
					eventHandlers={{
						click() {
							onClick(polygon, illustrateDataQP, setIllustrateDataQP)
						}
					}}
				></Polygon>
			)}
		</div>
	)
}
