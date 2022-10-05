import { Dispatch, SetStateAction } from 'react'
import { TModals } from '@/pages/map/types'

export interface IErrorModalProps {
	error: any
	setModal: Dispatch<SetStateAction<TModals>>
}
