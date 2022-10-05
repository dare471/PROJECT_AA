import { Dispatch, SetStateAction } from 'react'
import { TModals } from '@/pages/map/types'

export interface IMapModals {
	[key: string]: any
	modal: TModals
	setModal: Dispatch<SetStateAction<TModals>>
}
