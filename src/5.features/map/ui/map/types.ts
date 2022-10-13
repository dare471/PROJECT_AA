import { Dispatch, SetStateAction } from 'react'
import { IPosition, TIllustrate } from '@/3.pages'

export interface IMapProps {
	position: IPosition
	countryMutation: any
	regionMutation: any
	districtMutation: any
	clientMutation: any
	clientPolygonMutation: any
	illustrate: TIllustrate
	setIllustrate: Dispatch<SetStateAction<TIllustrate>>
}
