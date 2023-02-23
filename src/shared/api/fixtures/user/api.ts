import axios from 'axios'
import { createEffect } from 'effector'

import { envVars } from '~src/shared/config'

import { userAdapter, userMapHistoriesAdapter } from './adapter'
import type { User, UserMapHistory } from './types'

const instance = axios.create({
	baseURL: `${envVars.API_URL}/api`,
})

export const userQuery = createEffect<{ userId: number }, User>(async ({ userId }) => {
	const req = await instance({
		method: 'GET',
		url: `/user_data/${userId}`,
	})

	if (req.status === 200) {
		return userAdapter(req.data[0])
	}

	throw new Error('status is not 200')
})

export const userMapHistoriesQuery = createEffect<{ userId: number }, UserMapHistory[]>(async ({ userId }) => {
	const req = await instance({
		method: 'POST',
		url: `/history/maps`,
		data: {
			type: 'listBrowsing',
			userId,
		},
	})

	if (req.status === 200) {
		return userMapHistoriesAdapter(req.data)
	}

	throw new Error('status is not 200')
})
