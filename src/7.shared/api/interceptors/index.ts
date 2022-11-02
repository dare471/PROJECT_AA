import { Axios, AxiosResponse } from 'axios'

export const statusHandleInterceptors = (instance: Axios) => {
	instance.interceptors.response.use((res: AxiosResponse) => {
		const { data } = res

		if (data.success) {
			return res
		}

		throw new Error('Request Status Failed')
	})
}

export const errorHandleInterceptors = (instance: Axios) => {
	instance.interceptors.response.use((res: AxiosResponse) => {
		const { data } = res

		if (data.error) {
			throw new Error(data.error)
		} else if (res.status === 401) {
			throw new Error('Invalid Email or password')
		}

		return res
	})
}

export const dataHandleInterceptors = (instance: Axios) => {
	instance.interceptors.response.use((res: AxiosResponse) => {
		const { data } = res

		if (data && data?.data) {
			return res
		}

		throw new Error('Request data failed')
	})
}

export const geometryHandleInterceptors = (instance: Axios) => {
	instance.interceptors.response.use((res: AxiosResponse) => {
		const { data } = res

		if (data && data?.data && data.data.length > 0) {
			return res
		}

		throw new Error('Geometry has not')
	})
}
