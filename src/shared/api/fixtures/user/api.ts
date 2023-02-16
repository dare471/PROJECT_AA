import axios from 'axios'
import { createEffect } from 'effector'

import { envVars } from '~src/shared/config'

import type { UserInfo } from './types'

const instance = axios.create({
	baseURL: `${envVars.API_URL}/api`,
})

export const userInfoQuery = createEffect<{ userId: number }, UserInfo>(async ({ userId }) => {
	const req = await instance({
		method: 'GET',
		url: `/user_data/${userId}`,
	})

	if (req.status === 200) {
		return req.data[0]
	}

	throw new Error('status is not 200')
})
