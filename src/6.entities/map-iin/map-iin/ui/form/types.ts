import { Dispatch, MutableRefObject, SetStateAction } from 'react'
import { UseMutationResult } from 'react-query'

export interface IMapIinFormProps {
	mutationCoincideIin: UseMutationResult<any, any, any, any>
	abortCoincideIin: MutableRefObject<AbortController | null>
	iin: number | ''
	setIin: Dispatch<SetStateAction<number | ''>>
}
