import axios, { AxiosResponse } from 'axios'
import { createEffect } from 'effector'

import { envVar } from '~src/shared/config'

import type {
	AreaStructure,
	MarketPurchaseHistory,
	PotentialCulture,
	PurchaseHistory,
	YieldStructure
} from './types'

const instance = axios.create({
	baseURL: envVar.API_URL
})

export const getYieldStructuresQuery = createEffect<{ clientLandId: number }, YieldStructure[]>({
	handler: async ({ clientLandId }) => {
		const req: AxiosResponse<YieldStructure[]> = await instance({
			method: 'POST',
			url: '/api/analytics/client',
			data: {
				type: 'getPivotYieldStructure',
				clientId: clientLandId
			}
		})

		return req.data
	}
})

export const getMarketPurchaseHistoriesQuery = createEffect<
	{ clientLandId: number },
	MarketPurchaseHistory[]
>({
	handler: async ({ clientLandId }) => {
		const req: AxiosResponse<MarketPurchaseHistory[]> = await instance({
			method: 'POST',
			url: '/api/analytics/client',
			data: {
				type: 'getPurchaseHistoryMarket',
				clientId: clientLandId
			}
		})

		return req.data
	}
})

export const getPotentialCulturesQuery = createEffect<{ clientLandId: number }, PotentialCulture[]>(
	{
		handler: async ({ clientLandId }) => {
			const req: AxiosResponse<PotentialCulture[]> = await instance({
				method: 'POST',
				url: '/api/analytics/client',
				data: {
					type: 'getPotentialCult',
					clientId: clientLandId
				}
			})

			return req.data
		}
	}
)

export const getAreaStructuresQuery = createEffect<{ clientLandId: number }, AreaStructure[]>({
	handler: async ({ clientLandId }) => {
		const req: AxiosResponse<AreaStructure[]> = await instance({
			method: 'POST',
			url: '/api/analytics/client',
			data: {
				type: 'getAreaStructure',
				clientId: clientLandId
			}
		})

		return req.data
	}
})

export const getPurchaseHistoriesQuery = createEffect<{ clientLandId: number }, PurchaseHistory[]>({
	handler: async ({ clientLandId }) => {
		const req: AxiosResponse<PurchaseHistory[]> = await instance({
			method: 'POST',
			url: '/api/analytics/client',
			data: {
				type: 'getPurchaseHistory',
				clientId: clientLandId
			}
		})

		return req.data
	}
})
