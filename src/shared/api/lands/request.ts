import { createQuery } from '@farfetched/core'
import axios, { AxiosResponse } from 'axios'

import { envVar } from '~src/shared/config'

import { _DistrictsRes, _RegionsRes, districtsAdapter, regionsAdapter } from './adapters'
import { DistrictsRes, RegionsRes } from './types'

const instance = axios.create({ baseURL: envVar.API_URL })

export const getRegionsQuery = createQuery<void, RegionsRes>({
	handler: async () => {
		console.log('lol')
		const response: AxiosResponse<_RegionsRes> = await instance({
			url: '/api/country/v2',
			method: 'POST',
			data: {
				type: 'region'
			}
		})

		console.log(response.config)

		return regionsAdapter(response.data)
	}
})

export const getDistrictsQuery = createQuery<{ districtId: number }, DistrictsRes>({
	handler: async ({ districtId }) => {
		const response: AxiosResponse<_DistrictsRes> = await instance({
			url: '/api/country/v2',
			method: 'POST',
			data: {
				type: 'district',
				cato: districtId
			}
		})

		return districtsAdapter(response.data)
	}
})
