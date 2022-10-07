import { MutableRefObject } from 'react'
import { UseMutationResult } from 'react-query'

export interface IMapIinFormProps {
	mutationCoincideIin: UseMutationResult<any, any, any, any>
	abortCoincideIin: MutableRefObject<AbortController | null>
	select: any
	handleChangeCurrentPolygon: any
}
