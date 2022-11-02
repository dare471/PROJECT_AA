import axios, { AxiosRequestConfig } from 'axios'

axios.interceptors.request.use((request: AxiosRequestConfig) => {
	const token = localStorage.getItem('token')

	if (token) {
		request.headers = {
			Authorization: `Bearer ${token}`
		}
	}

	return request
})
