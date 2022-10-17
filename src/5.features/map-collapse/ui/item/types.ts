import { Dispatch, SetStateAction } from 'react'
import { IPolygonData } from '@/7.shared/api'
import { TListIllustrate } from '../types'

export interface IMapCollapseItemProps {
	data: IPolygonData
	listIllustrate: TListIllustrate
	setListIllustrate: Dispatch<SetStateAction<TListIllustrate>>
}
