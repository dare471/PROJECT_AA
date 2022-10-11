import { Dispatch, SetStateAction } from 'react'
import { TModals } from '@/3.pages/map/types'

export interface IErrorModalProps {
	error: any
	setModal: Dispatch<SetStateAction<TModals>>
}
