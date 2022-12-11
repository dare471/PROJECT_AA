import { createQuery } from '@farfetched/core'
import axios from 'axios'

import { envVar } from '~src/shared/config'

import type { ClientLand, ClientLandPlotCulture } from './types'

const instance = axios.create({
	baseURL: envVar.API_URL
})

export const getClientsLandFromRegionsQuery = createQuery<{ regionId: number }, ClientLand[]>({
	handler: async ({ regionId }) => {
		const req = await instance({
			method: 'POST',
			url: '/api/mainquery',
			data: {
				type: 'mainQuery',
				regionId
			}
		})

		return req.data
	}
})

export const getClientsLandPlotsCulturesQuery = createQuery<
	{ id: number; cultIds: number[] },
	ClientLandPlotCulture[]
>({
	handler: async ({ id, cultIds }) => {
		const req = await instance({
			method: 'POST',
			url: '/api/mainquery',
			data: {
				type: 'mainQuery',
				regionId: id,
				cultId: cultIds
			}
		})

		return req.data
	}
})
