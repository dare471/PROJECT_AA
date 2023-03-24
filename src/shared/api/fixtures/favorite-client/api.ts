import axios from 'axios'
import { createEffect } from 'effector'

import { envVars } from '~src/shared/config'

import type { FavoriteClientInfo } from './types.api'

const instance = axios.create({
	baseURL: `${envVars.API_URL}/api`,
})

export const favoriteClientsQuery = createEffect<{ userId: number }, FavoriteClientInfo[]>(async ({ userId }) => {
	const req = await instance({
		method: 'POST',
		url: '/manager/workspace',
		data: {
			type: 'clientsFavoriteList',
			userId,
		},
	})

	if (req.status === 200) {
		return req.data
	}

	throw new Error('status is not 200')
})

export const addClientFavoriteMutation = createEffect<{ userId: number; clientIds: number[] }, boolean>(
	async ({ userId, clientIds }) => {
		const req = await instance({
			method: 'POST',
			url: '/manager/workspace',
			data: {
				type: 'addToFavorites',
				userId,
				clientId: clientIds,
			},
		})

		return req.status === 200
	},
)

export const deleteClientFavoriteMutation = createEffect<{ userId: number; clientIds: number[] }, boolean>(
	async ({ userId, clientIds }) => {
		const req = await instance({
			method: 'POST',
			url: '/manager/workspace',
			data: {
				type: 'deleteToFavorites',
				userId,
				clientId: clientIds,
			},
		})

		return req.status === 200
	},
)
