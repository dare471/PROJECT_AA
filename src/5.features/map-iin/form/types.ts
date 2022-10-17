import { Dispatch, MutableRefObject, SetStateAction } from 'react'
import { UseMutationResult } from 'react-query'
import { TIllustrate } from '@/3.pages/map/types'

export interface IMapIinFormProps {
	mutationCoincideIin: UseMutationResult<any, any, any, any>
	abortCoincideIin: MutableRefObject<AbortController | null>
	iin: number | ''
	setIin: Dispatch<SetStateAction<number | ''>>
	setIllustrate: Dispatch<SetStateAction<TIllustrate>>
}
