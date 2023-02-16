import axios from 'axios'
import { createEffect } from 'effector'

import { envVars } from '~src/shared/config'

import { regionsAdapter } from '../../adapters'
import type { RegionAnalytic, RegionLand } from './types'

const instance = axios.create({
	baseURL: `${envVars.API_URL}/api`,
})

export const regionsOverlayQuery = createEffect<void, RegionLand[]>(async () => {
	const req = await instance({
		url: '/country',
		method: 'POST',
		data: {
			type: 'region',
		},
	})

	if (req.status === 200) {
		return regionsAdapter(req.data)
	}

	throw new Error('status is not 200')
})

export const regionsQuery = createEffect<{ regionBilling: number[] }, RegionLand[]>(async ({ regionBilling }) => {
	const req = await instance({
		method: 'POST',
		url: '/country',
		data: {
			type: 'region',
			regionBilling,
		},
	})

	if (req.status === 200) {
		return regionsAdapter(req.data)
	}

	throw new Error('status is not 200')
})

export const regionsAnalyticsQuery = createEffect<{ regionIds: number[] }, RegionAnalytic[]>(async ({ regionIds }) => {
	const req = await instance({
		method: 'POST',
		url: '/mainquery',
		data: {
			type: 'getAnalytic',
			regionId: regionIds,
		},
	})

	if (req.status === 200) {
		return req.data
	}

	throw new Error('status is not 200')
})
