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

		return req.data
	},
)

export const sessionHookQuery = createEffect<{ userId: number }, SessionHook>(async ({}) => {
	const req = await instance({
		method: 'POST',
		url: '/webhook/user',
	})

	return req.data
})
