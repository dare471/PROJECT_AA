import { Dispatch, SetStateAction } from 'react'
import { IPosition } from '@/pages/map'
import { TPolygon } from '@/shared/api'

export interface IMapProps {
	position: IPosition
	currentPolygon: TPolygon
	setCurrentPolygon: Dispatch<SetStateAction<TPolygon>>
	handleChangeCurrentPolygon: any
}
