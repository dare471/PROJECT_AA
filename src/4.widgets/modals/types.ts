import { Dispatch, SetStateAction } from 'react'
import { TModals } from '@/3.pages/map/types'

export interface IModalsProps {
	[key: string]: any
	modal: TModals
	setModal: Dispatch<SetStateAction<TModals>>
}
