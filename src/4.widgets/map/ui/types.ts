import { Dispatch, SetStateAction } from 'react'
import { IPosition, TIllustrate } from '@/3.pages'

export interface IMapProps {
	position: IPosition
	handleMutation: any
	illustrate: TIllustrate
	setIllustrate: Dispatch<SetStateAction<TIllustrate>>
}
