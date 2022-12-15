import axios, { AxiosResponse } from 'axios'
import { createEffect } from 'effector'

import { envVar } from '~src/shared/config'

import type { CountryAnalytic, RegionAnalytic } from './types'

const instance = axios.create({
	baseURL: envVar.API_URL
})

export const getCountryAnalyticsQuery = createEffect<void, CountryAnalytic[]>({
	handler: async () => {
		const req: AxiosResponse<CountryAnalytic[]> = await instance({
			method: 'POST',
			url: '/api/analytics/client',
			data: {
				type: 'getPivotSubsideCountry'
			}
		})

		return req.data
	}
})

export const getRegionAnalyticsQuery = createEffect<{ regionId: number }, RegionAnalytic[]>({
	handler: async ({ regionId }) => {
		const req: AxiosResponse<RegionAnalytic[]> = await instance({
			method: 'POST',
			url: '/api/analytics/client',
			data: {
				type: 'getPivotSubsideRegion',
				regionId
			}
		})

		return req.data
	}
})
