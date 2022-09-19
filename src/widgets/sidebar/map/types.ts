import { Dispatch, SetStateAction } from 'react'
import { IIllustratePolygons } from '@/pages/map/types'
import { IPolygon, TPolygons } from '@/shared/api'

export interface IMapSidebarProps {
	districtPolygons: TPolygons
	areaPolygons: TPolygons
	polygons: TPolygons
	illustratePolygons: IIllustratePolygons
	activePolygon: IPolygon | null
	setDistrictPolygons: Dispatch<SetStateAction<TPolygons>>
}

export interface ICompletedPosition {
	x: number | null
	y: number | null
}

export interface IInitIndex {
	index: number | 'LAST'
	align: 'center'
	behavior: 'smooth'
}
