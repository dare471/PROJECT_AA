import { Dispatch, SetStateAction } from 'react'
import { TModals } from '@/3.pages/map'
import { IClientInfo } from '@/7.shared/api'

export interface IMapRightSidebarProps {
	clientInfo: IClientInfo | null
	setModal: Dispatch<SetStateAction<TModals>>
}
