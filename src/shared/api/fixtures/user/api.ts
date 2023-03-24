import axios from 'axios'
import { createEffect } from 'effector'

import { envVars } from '~src/shared/config'

import { UserAdapter } from './adapter'
import type { User, UserClient, UserContract, UserMapHistory, UserRegion } from './types.api'

const instance = axios.create({
	baseURL: `${envVars.API_URL}/api`,
})

export const userQuery = createEffect<{ userId: number }, User>(async ({ userId }) => {
	const req = await instance({
		method: 'GET',
		url: `/user_data/${userId}`,
	})

	if (req.status === 200) {
		return UserAdapter.fromApiToUser(req.data[0])
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
		return UserAdapter.fromApiToMapHistories(req.data)
	}

	throw new Error('status is not 200')
})

export const userContractsQuery = createEffect<{ userId: number }, UserContract[]>(async ({ userId }) => {
	const req = await instance({
		method: 'POST',
		url: '/manager/workspace',
		data: {
			type: 'managerContracts',
			userId,
		},
	})

	return req.data
})

export const userSubscribeClientsQuery = createEffect<{ userId: number }, UserClient[]>(async ({ userId }) => {
	const req = await instance({
		method: 'POST',
		url: '/user/setting',
		data: {
			settings: 'listClient',
			userId,
		},
	})

	if (req.status === 200) {
		return req.data
	}

	throw new Error('status is not 200')
})

export const userUnSubscribeClientsQuery = createEffect<{ userId: number }, UserClient[]>(async ({ userId }) => {
	const req = await instance({
		method: 'POST',
		url: '/user/setting',
		data: {
			settings: 'listUnfollowedClient',
			userId,
		},
	})

	if (req.status === 200) {
		return req.data
	}

	throw new Error('status is not 200')
})

export const addUserUnSubscribeClientsMutation = createEffect<{ userId: number; clientIds: number[] }, boolean>(
	async ({ userId, clientIds }) => {
		const req = await instance({
			method: 'POST',
			url: '/user/setting',
			data: {
				settings: 'addUnfollowedClient',
				userId,
				unfollowedObj: {
					clientId: clientIds,
				},
			},
		})

		return req.status === 200
	},
)

export const userSubscribeRegionsQuery = createEffect<{ userId: number }, UserRegion[]>(async ({ userId }) => {
	const req = await instance({
		method: 'POST',
		url: '/user/setting',
		data: {
			settings: 'subscribesRegion',
			userId,
		},
	})

	return req.data
})

export const userUnSubscribeRegionsQuery = createEffect<{ userId: number }, UserRegion[]>(async ({ userId }) => {
	const req = await instance({
		method: 'POST',
		url: '/user/setting',
		data: {
			settings: 'notSubscribesRegion',
			userId,
		},
	})

	if (req.status === 200) {
		return req.data
	}

	throw new Error('status is not 200')
})

export const addUserSubscribeRegionsMutation = createEffect<{ userId: number; regionIds: number[] }, boolean>(
	async ({ userId, regionIds }) => {
		const req = await instance({
			method: 'POST',
			url: '/user/setting',
			data: {
				settings: 'subscribeToRegion',
				userId,
				subscribeObj: { region: regionIds },
			},
		})

		return req.data === 200
	},
)
