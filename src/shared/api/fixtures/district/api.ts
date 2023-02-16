import axios from 'axios'
import { createEffect } from 'effector'

import { envVars } from '~src/shared/config'

import { districtsAdapter } from '../../adapters'
import type { DistrictLand } from './types'

const instance = axios.create({
	baseURL: `${envVars.API_URL}/api`,
})

export const districtsQuery = createEffect<{ regionId: number }, DistrictLand[]>({
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
			return districtsAdapter(req.data)
		}

		throw new Error('status is not 200')
	},
})
