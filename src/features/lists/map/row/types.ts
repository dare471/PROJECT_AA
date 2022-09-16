import { Dispatch, RefObject, SetStateAction } from 'react'
import { IIllustratePolygons } from '@/pages/map/types'
import { IPolygon } from '@/shared/api'
import { IInitIndex } from './../../../../widgets/sidebar/map/types'

export interface IMapListRowProps {
	data: any
	index: number
	style?: any
	illustratePolygons: IIllustratePolygons
	activePolygon: IPolygon | null
	initIndex: IInitIndex
	setInitIndex: Dispatch<SetStateAction<IInitIndex>>
}
