import { useRef } from 'react'
import { useMutation } from 'react-query'

export const useMutationCustom = <T, R>(callback: (signal: AbortSignal, params: T) => Promise<R>, options?: any) => {
	const abortControllerRef = useRef<AbortController | null>(null)

	const mutation = useMutation((params: T) => {
		abortControllerRef.current = new AbortController()

		return callback(abortControllerRef.current.signal, params)
	}, options)

	return [mutation, abortControllerRef] as const
}
