import { Dispatch, SetStateAction } from 'react'
import { TIin } from '@/6.entities/map-iin/types'

export interface IMapIinListItemProps {
	data: any
	index: number
	style: any
	setIin: Dispatch<SetStateAction<TIin>>
}
