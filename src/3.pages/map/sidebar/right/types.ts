import { Dispatch, SetStateAction } from 'react'
import { TIllustrate, TModals } from '@/3.pages/map'
import { IClientInfo } from '@/7.shared/api'

export interface IMapRightSidebarProps {
	clientInfo: IClientInfo | null
	setModal: Dispatch<SetStateAction<TModals>>
	setIllustrate: Dispatch<SetStateAction<TIllustrate>>
}
