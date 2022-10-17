import { Dispatch, SetStateAction } from 'react'
import { IClientInfo } from '@/7.shared/api'
import { IListPolygons, TIllustrate, TModals } from '../../types'

export interface IMapTabsProps {
	clientInfo: IClientInfo | null
	setModal: Dispatch<SetStateAction<TModals>>
	setIllustrate: Dispatch<SetStateAction<TIllustrate>>
	listPolygons: IListPolygons | null
	illustrate: TIllustrate
	handlePrev: any
}
