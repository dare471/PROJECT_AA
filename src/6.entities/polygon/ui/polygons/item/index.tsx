import { Polygon } from 'react-leaflet'
import { useQueryParam } from 'use-query-params'

import { TPolygon } from '@/7.shared/api'

type TMapPolygonProps = {
	polygon: TPolygon
	color: ((polygon: TPolygon) => string) | string
	onClick?: (polygon: TPolygon, illustrateDataQP: any, setIllustrateDataQP: any) => void
}

export const MapPolygon = (props: TMapPolygonProps) => {
	const { polygon, color, onClick } = props

	const [illustrateDataQP, setIllustrateDataQP] = useQueryParam(`${polygon?.type}`)

	return (
		<div style={{ inlineSize: '100%', blockSize: '100%' }}>
			{polygon.geometry_rings && (
				<Polygon
					positions={polygon.geometry_rings as any}
					pathOptions={{ color: color instanceof Function ? color(polygon) : color }}
					eventHandlers={{
						click() {
							if (onClick) {
								onClick(polygon, illustrateDataQP, setIllustrateDataQP)
							}
						}
					}}
				></Polygon>
			)}
		</div>
	)
}
