import { IListPolygons } from '@/pages/map/types'

export interface IMapSidebarProps {
	listPolygons: IListPolygons | null
	handleChangeCurrentPolygon: any
	handlePolygon: any
}
