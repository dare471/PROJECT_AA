import { Dispatch, RefObject, SetStateAction } from 'react'
import { IIllustratePolygons } from '@/pages/map'
import { IPolygon } from '@/shared/api'
import { IInitIndex } from './../../../../widgets/sidebar/map/types'

export interface IDropDown {
	children: any
	dropdown: boolean

	illustratePolygons: IIllustratePolygons
	activePolygon: IPolygon | null
	initIndex: IInitIndex
	setInitIndex: Dispatch<SetStateAction<IInitIndex>>
}
