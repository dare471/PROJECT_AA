import { useRef } from 'react'
import { useMutation } from 'react-query'

export const useMutationCustom = <T, R>(
	callback: (params: T, abortController: AbortSignal) => Promise<R>,
	options?: any
) => {
	const abortControllerRef = useRef<AbortController | null>(null)

	const mutation = useMutation((params: T) => {
		abortControllerRef.current = new AbortController()

		return callback(params, abortControllerRef.current?.signal)
	}, options)

	return { mutation, abortControllerRef }
}
