import { IListPolygons } from '@/3.pages/map/types'

export interface IMapSidebarProps {
	listPolygons: IListPolygons | null
	handleChangeCurrentPolygon: any
	handlePolygon: any
}
