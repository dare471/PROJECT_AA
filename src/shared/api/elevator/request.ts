import axios, { AxiosResponse } from 'axios'
import { createEffect } from 'effector'

import { envVar } from '~src/shared/config'

import { Elevator } from './types'

const instance = axios.create({
	baseURL: envVar.API_URL
})

export const getElevatorsQuery = createEffect<void, Elevator[]>({
	handler: async () => {
		const req: AxiosResponse<Elevator[]> = await instance({
			method: 'POST',
			url: '/api/country/v2',
			data: {
				type: 'elevatorMarker'
			}
		})

		return req.data
	}
})
