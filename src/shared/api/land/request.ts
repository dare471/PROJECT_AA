import { createQuery } from '@farfetched/core'
import axios, { AxiosResponse } from 'axios'

import { envVar } from '~src/shared/config'

import { _DistrictsRes, _RegionsRes, districtsAdapter, regionsAdapter } from './adapters'
import { District, Region } from './types'

const instance = axios.create({ baseURL: envVar.API_URL })

export const getRegionsQuery = createQuery<void, Region[]>({
	handler: async () => {
		const req: AxiosResponse<_RegionsRes> = await instance({
			url: '/api/country/v2',
			method: 'POST',
			data: {
				type: 'region'
			}
		})

		return regionsAdapter(req.data).data
	}
})

export const getDistrictsQuery = createQuery<{ regionId: number }, District[]>({
	handler: async ({ regionId }) => {
		const req: AxiosResponse<_DistrictsRes> = await instance({
			url: '/api/country/v2',
			method: 'POST',
			data: {
				type: 'district',
				regionId
			}
		})

		return districtsAdapter(req.data).data
	}
})
