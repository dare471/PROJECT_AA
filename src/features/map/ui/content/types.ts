import { IPosition } from '@/pages/map'
import { TPolygon } from '@/shared/api'

export interface IMapContentProps {
	position: IPosition
	currentPolygon: TPolygon
	handleChangeCurrentPolygon: any
}
