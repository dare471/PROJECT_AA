import { Dispatch, SetStateAction } from 'react'
import { TModals } from '@/pages/map/types'

export interface IMapInfoSidebarProps {
	clientInfo: any
	handleChangeCurrentPolygon: any
	setModal: Dispatch<SetStateAction<TModals>>
}
