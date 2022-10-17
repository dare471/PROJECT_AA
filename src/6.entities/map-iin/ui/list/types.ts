import { Dispatch, SetStateAction } from 'react'
import { TIin } from '../../types'

export interface IMapIinListProps {
	data: any
	setIin: Dispatch<SetStateAction<TIin>>
}
