import { Dispatch, SetStateAction } from 'react'
import { TModals } from '@/pages/map'

export interface IMapCommentModalProps {
	header: any
	info: any
	index: number
	setModal: Dispatch<SetStateAction<TModals>>
}
