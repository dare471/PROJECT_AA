import { Axios, AxiosResponse } from 'axios'

export const checkStatusInterceptors = (instance: Axios) => {
	instance.interceptors.response.use((res: AxiosResponse) => {
		const { data } = res

		if (data.success) {
			return res
		}

		throw new Error('Request Status Failed')
	})
}

export const checkDataInterceptors = (instance: Axios) => {
	instance.interceptors.response.use((res: AxiosResponse) => {
		const { data } = res

		if (data && data?.data && data.data.length > 0) {
			return res
		}

		throw new Error('Request data failed')
	})
}

export const checkGeometryInterceptors = (instance: Axios) => {
	instance.interceptors.response.use((res: AxiosResponse) => {
		const { data } = res

		if (data && data?.data && data.data.length && data.data[0]['GEOMETRY_RINGS']) {
			return res
		}

		throw new Error('Geometry has not')
	})
}
