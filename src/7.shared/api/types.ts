import { AxiosResponse } from 'axios'

// eslint-disable-next-line @typescript-eslint/ban-types
export type TParams<T = {}> = { signal: AbortSignal | undefined } & T

export type TResponse<T> = {
	data: T
	success: boolean
	error: Error | string
	header: any
}

export type TCustomAxiosResponse<T> = AxiosResponse<TResponse<T>>

// eslint-disable-next-line @typescript-eslint/ban-types
export type TReturn<T, K = {}> = {
	data: T
	header: K
}
