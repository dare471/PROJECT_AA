import axios from 'axios'
import { createEffect } from 'effector'

import { envVars } from '~src/shared/config'

import { type SessionHook, type UserCredentials } from './types'

const instance = axios.create({
	baseURL: `${envVars.API_URL}/api`,
})

export const signInQuery = createEffect<{ email: string; password: string }, UserCredentials>(
	async ({ email, password }) => {
		const req = await instance({
			method: 'POST',
			url: '/auth/login',
			data: {
				email,
				password,
			},
		})

		if (req.status === 200) {
			return req.data
		}

		throw new Error('status is not 200')
	},
)

export const sessionHookQuery = createEffect<{ userId: number }, SessionHook>(async ({ userId }) => {
	const req = await instance({
		method: 'POST',
		url: '/weebhook/user',
		data: {
			userId,
		},
	})

	if (req.status === 200) {
		return req.data[0]
	}

	throw new Error('status is not 200')
})
