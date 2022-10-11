import { IPolygonData } from '@/7.shared/api'

export interface IMapPolygonsProps {
	polygons: IPolygonData
	color: ((polygon: any) => string) | string
	onClick: any
}
