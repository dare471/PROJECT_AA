import { Dispatch, SetStateAction } from 'react'
import { TModals } from '@/3.pages/map/types'

export interface IMapModals {
	[key: string]: any
	modal: TModals
	setModal: Dispatch<SetStateAction<TModals>>
}
