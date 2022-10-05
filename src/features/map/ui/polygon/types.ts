import { IPolygonData } from '@/shared/api'

export interface IMapPolygonsProps {
	polygons: IPolygonData
	handleChangeCurrentPolygon: any
	color: string
}
