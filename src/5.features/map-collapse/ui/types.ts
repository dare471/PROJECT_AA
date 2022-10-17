import { Dispatch, SetStateAction } from 'react'
import { TIllustrate } from '@/3.pages'

export interface IMapCollapseProps {
	listPolygons: any
	illustrate: TIllustrate
	setIllustrate: Dispatch<SetStateAction<TIllustrate>>
}

export type TListIllustrate = 'region' | 'district' | null

// export type TListIllustrate = {
// 	key: TListIllustrateKey
// 	value: string
// } | null
