import axios, { AxiosResponse } from 'axios'
import { createEffect } from 'effector'

import { envVar } from '~src/shared/config'

import { _District, _Region, districtsAdapter, regionsAdapter } from './adapters'
import type { Culture, CulturesRes, District, Region } from './types'

const instance = axios.create({ baseURL: envVar.API_URL })

export const getRegionsQuery = createEffect<void, Region[]>({
	handler: async () => {
		const req: AxiosResponse<_Region[]> = await instance({
			url: '/api/country/v2',
			method: 'POST',
			data: {
				type: 'region'
			}
		})

		return regionsAdapter(req.data)
	}
})

export const getRegionCulturesQuery = createEffect<{ regionId: number }, Culture[]>({
	handler: async ({ regionId }) => {
		const req: AxiosResponse<CulturesRes> = await instance({
			method: 'POST',
			url: `/api/mainquery`,
			data: {
				type: 'sprCult',
				regionId
			}
		})

		return req.data.data
	}
})

export const getDistrictsQuery = createEffect<{ regionId: number }, District[]>({
	handler: async ({ regionId }) => {
		const req: AxiosResponse<_District[]> = await instance({
			url: '/api/country/v2',
			method: 'POST',
			data: {
				type: 'district',
				regionId
			}
		})

		return districtsAdapter(req.data)
	}
})
