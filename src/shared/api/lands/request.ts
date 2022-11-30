import { createQuery } from '@farfetched/core'
import axios, { AxiosResponse } from 'axios'

import { envVar } from '~src/shared/config'

import { _DistrictsRes, _RegionsRes, districtsAdapter, regionsAdapter } from './adapters'
import { DistrictsRes, RegionsRes } from './types'

const instance = axios.create({ baseURL: envVar.API_URL })

export const getRegionsQuery = createQuery<void, RegionsRes>({
	handler: async () => {
		const response: AxiosResponse<_RegionsRes> = await instance({
			url: '/api/country/v2',
			method: 'POST',
			data: {
				type: 'region'
			}
		})

		return regionsAdapter(response.data)
	}
})

export const getDistrictsQuery = createQuery<{ regionId: number }, DistrictsRes>({
	handler: async ({ regionId }) => {
		const response: AxiosResponse<_DistrictsRes> = await instance({
			url: '/api/country/v2',
			method: 'POST',
			data: {
				type: 'district',
				regionId
			}
		})

		return districtsAdapter(response.data)
	}
})
