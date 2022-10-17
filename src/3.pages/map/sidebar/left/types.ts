import { Dispatch, SetStateAction } from 'react'
import { IListPolygons, TIllustrate } from '@/3.pages'

export interface IMapLeftSidebarProps {
	listPolygons: IListPolygons | null
	illustrate: TIllustrate
	setIllustrate: Dispatch<SetStateAction<TIllustrate>>
	handlePrev: any
}
