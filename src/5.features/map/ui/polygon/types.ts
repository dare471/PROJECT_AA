import { IPolygonData } from '@/7.shared/api'

export interface IMapPolygonsProps {
	polygons: IPolygonData
	handleChangeCurrentPolygon: any
	color: string
}
