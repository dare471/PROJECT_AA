import { Dispatch, SetStateAction } from 'react'
import { IPosition } from '@/pages/map'
import { TPolygons } from '@/shared/api'
import { IPolygon } from '@/shared/api/polygon/types'
import { IIllustratePolygons } from '../../../../pages/map/types'

export interface IMapProps {
	position: IPosition
	illustratePolygons: IIllustratePolygons
	setIllustratePolygons: Dispatch<SetStateAction<IIllustratePolygons>>
	areaPolygons: TPolygons
	districtPolygons: TPolygons
	polygons: TPolygons
	activePolygon: IPolygon | null
	setActivePolygon: Dispatch<SetStateAction<IPolygon | null>>
}
