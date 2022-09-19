import { Dispatch, SetStateAction } from 'react'
import { TPolygons } from '@/shared/api'

export interface IMapCollapseProps {
	data: any
	setDistrictPolygons?: Dispatch<SetStateAction<TPolygons>>
}
