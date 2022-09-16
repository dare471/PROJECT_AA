import { Dispatch, SetStateAction } from 'react'
import { IIllustratePolygons } from '@/pages/map'
import { IPolygon, TPolygons } from '@/shared/api'

export interface IMapActivePolygonProps {
	activePolygon: IPolygon | null
	setActivePolygon: Dispatch<SetStateAction<IPolygon>>
	polygons: TPolygons
	illustratePolygons: IIllustratePolygons
}
