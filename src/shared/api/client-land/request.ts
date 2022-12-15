import axios from 'axios'
import { createEffect } from 'effector'

import { envVar } from '~src/shared/config'

import type { ClientLand, ClientLandPlot, ClientLandPlotCulture } from './types'

const instance = axios.create({
	baseURL: envVar.API_URL
})

export const getClientsLandFromRegionsQuery = createEffect<{ regionId: number }, ClientLand[]>({
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

export const getClientsLandPlotsCulturesQuery = createEffect<
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

export const getClientLandPlots = createEffect<{ clientId: number }, ClientLandPlot[]>({
	handler: async ({ clientId }) => {
		const req = await instance({
			method: 'POST',
			url: 'api/mainquery',
			data: {
				type: 'mainQuery',
				clientId
			}
		})

		return req.data
	}
})
