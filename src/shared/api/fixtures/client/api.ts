import axios from 'axios'
import { createEffect } from 'effector'

import { envVars } from '~src/shared/config'

import {
	clientInfoAdapter,
	clientPlotsByRegionAdapter,
	clientSearchHintsAdapter,
	clientsPlotsAdapter,
	clientsPlotsByCulturesAdapter,
} from '../../adapters'
import type {
	ClientAnalytic,
	ClientInfo,
	ClientInformalPointRef,
	ClientLandPlot,
	ClientLandShortPlot,
	ClientOffice,
	ClientSearchHint,
	FavoriteClientInfo,
} from './types'

const instance = axios.create({
	baseURL: `${envVars.API_URL}/api`,
})

export const clientsInfoQuery = createEffect<{ clientIds: number[] }, ClientInfo[]>(async ({ clientIds }) => {
	const req = await instance({
		method: 'POST',
		url: '/filterPlots',
		data: {
			type: 'filterPlots',
			action: 'getInfClient',
			arrClient: clientIds,
		},
	})

	if (req.status === 200) {
		return req.data
	}

	throw new Error('status is not 200')
})

export const clientInfoQuery = createEffect<{ clientId: number }, ClientInfo>({
	handler: async ({ clientId }) => {
		const req = await instance({
			method: 'POST',
			url: '/api/manager/workspace',
			data: {
				type: 'profileClient',
				action: 'getMainInf',
				clientId,
			},
		})

		return clientInfoAdapter(req.data[0])
	},
})

export const clientsPlotsByRegionQuery = createEffect<
	{ regionId: number; unFollowClients?: number[] },
	ClientLandShortPlot[]
>(async ({ regionId, unFollowClients }) => {
	const req = await instance({
		method: 'POST',
		url: '/mainquery',
		data: {
			type: 'mainQuery',
			regionId,
			unFollowClients,
		},
	})

	if (req.status === 200) {
		return clientsPlotsAdapter(req.data)
	}

	throw new Error('status is not 200')
})

export const clientsPlotsByCulturesQuery = createEffect<{ regionId: number; cultureIds: number[] }, ClientLandPlot[]>(
	async ({ regionId, cultureIds }) => {
		const req = await instance({
			method: 'POST',
			url: '/mainquery',
			data: {
				type: 'mainQuery',
				regionId,
				cultId: cultureIds,
			},
		})

		if (req.status === 200) {
			return clientsPlotsByCulturesAdapter(req.data)
		}

		throw new Error('status is not 200')
	},
)

export const clientPlotsQuery = createEffect<{ clientId: number }, ClientLandPlot[]>(async ({ clientId }) => {
	const req = await instance({
		method: 'POST',
		url: '/mainquery',
		data: {
			type: 'mainQuery',
			clientId: clientId,
		},
	})

	if (req.status === 200) {
		// FIXME: Change response from array to object
		return clientPlotsByRegionAdapter(req.data[0])
	}

	throw new Error('status is not 200')
})

export const clientAnalyticsQuery = createEffect<{ clientId: number }, ClientAnalytic[]>(async ({ clientId }) => {
	const req = await instance({
		method: 'POST',
		url: '/analytics',
		data: {
			type: 'getAnalyticsForClient',
			clientId,
		},
	})

	if (req.status === 200) {
		return req.data
	}

	throw new Error('status is not 200')
})

export const clientSearchHintsQuery = createEffect<
	{ districtId: number; clientBin?: number; clientName?: string },
	ClientSearchHint[]
>(async ({ districtId, clientBin, clientName }) => {
	const req = await instance({
		method: 'POST',
		url: '/mainquery',
		data: {
			type: 'searchIin',
			districtId,
			clientName,
			clientBin,
		},
	})

	if (req.status === 200) {
		return clientSearchHintsAdapter(req.data)
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

export const clientOfficeQuery = createEffect<{ clientId: number }, ClientOffice>(async ({ clientId }) => {
	const req = await instance({
		method: 'POST',
		url: '/manager/workspace',
		data: {
			type: 'choiceMeetingPlace',
			id: 44,
			clientId,
		},
	})

	if (req.status === 200) {
		return req.data
	}

	throw new Error('status is not 200')
})

export const clientInformalPointRefsQuery = createEffect<{ clientId: number }, ClientInformalPointRef[]>(async () => {
	const req = await instance({
		method: 'POST',
		url: '/manager/workspace',
		data: {
			type: 'choiceMeetingPlace',
			handbook: 'clientBusinessPoint',
		},
	})

	if (req.status === 200) {
		return req.data
	}

	throw new Error('status is not 200')
})

export const addClientInformalPointMutation = createEffect<
	{
		clientId: number
		details: string
		ref: number
		point: [number, number]
	},
	boolean
>(async ({ clientId, details, ref, point }) => {
	const req = await instance({
		method: 'POST',
		url: '/manager/workspace',
		data: {
			type: 'choiceMeetingPlace',
			clientId,
			placeName: details,
			placeId: ref,
			placeCoordinate: point,
		},
	})

	return req.status === 200
})
