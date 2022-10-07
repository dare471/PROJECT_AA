import { Dispatch, SetStateAction } from 'react'
import { IPosition } from '@/3.pages/map'
import { TPolygon } from '@/7.shared/api'

export interface IMapProps {
	position: IPosition
	childrenPolygon: TPolygon
	setChildrenPolygon: Dispatch<SetStateAction<TPolygon>>
	handleChangeCurrentPolygon: any
}
