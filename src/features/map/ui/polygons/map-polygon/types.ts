import { IIllustratePolygons } from '@/pages/map/types'
import { IPolygon } from '@/shared/api/polygon/types'

export interface IMapPolygonsProps {
	polygons: IPolygon[]
	illustratePolygons: IIllustratePolygons
	activePolygon: IPolygon | null
}
