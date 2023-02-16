import axios from 'axios'
import { createEffect } from 'effector'

import { envVars } from '~src/shared/config'

import type { CultureReference } from './types'

const instance = axios.create({
	baseURL: `${envVars.API_URL}/api`,
})

export const cultureReferencesQuery = createEffect<{ regionId: number }, CultureReference[]>(async ({ regionId }) => {
	const req = await instance({
		method: 'POST',
		url: '/mainquery',
		data: {
			type: 'sprCult',
			regionId,
		},
	})

	return req.data
})
