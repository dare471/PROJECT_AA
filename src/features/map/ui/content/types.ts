import { Dispatch, SetStateAction } from 'react'
import { IPosition } from '@/pages/map'
import { IPolygon, TPolygons } from '@/shared/api'
import { IIllustratePolygons } from './../../../../pages/map/types'

export interface IMapContentProps {
	position: IPosition
	illustratePolygons: IIllustratePolygons
	setIllustratePolygons: Dispatch<SetStateAction<IIllustratePolygons>>
	areaPolygons: TPolygons
	districtPolygons: TPolygons
	polygons: TPolygons
	activePolygon: IPolygon | null
	setActivePolygon: Dispatch<SetStateAction<IPolygon | null>>
}
