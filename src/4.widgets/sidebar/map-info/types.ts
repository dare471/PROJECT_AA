import { Dispatch, SetStateAction } from 'react'
import { TModals } from '@/3.pages/map/types'

export interface IMapInfoSidebarProps {
	clientInfo: any
	handleChangeCurrentPolygon: any
	setModal: Dispatch<SetStateAction<TModals>>
}
