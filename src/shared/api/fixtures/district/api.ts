import axios from 'axios'
import { createEffect } from 'effector'

import { envVars } from '~src/shared/config'

import { DistrictAdapter } from './adapter'
import type { District } from './types.api'

const instance = axios.create({
	baseURL: `${envVars.API_URL}/api`,
})

export const districtsQuery = createEffect<{ regionId: number }, District[]>({
	handler: async ({ regionId }) => {
		const req = await instance({
			url: '/country',
			method: 'POST',
			data: {
				type: 'district',
				regionId,
			},
		})

		if (req.status === 200) {
			return DistrictAdapter.fromApiToDistricts(req.data)
		}

		throw new Error('status is not 200')
	},
})
