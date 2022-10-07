import { IPosition } from '@/3.pages/map'
import { TPolygon } from '@/7.shared/api'

export interface IMapContentProps {
	position: IPosition
	childrenPolygon: TPolygon
	handleChangeCurrentPolygon: any
}
