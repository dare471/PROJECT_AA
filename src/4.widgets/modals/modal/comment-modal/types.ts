import { Dispatch, SetStateAction } from 'react'
import { TModals } from '@/3.pages/map'

export interface IMapCommentModalProps {
	header: any
	info: any
	index: number
	setModal: Dispatch<SetStateAction<TModals>>
}
