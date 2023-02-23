import axios from 'axios'
import { createEffect } from 'effector'

import { envVars } from '~src/shared/config'

import {
	clientAdapter,
	clientContractsAdapter,
	clientInformalPointRefsAdapter,
	clientPlotsAdapter,
	clientsAdapter,
	clientSearchHintsAdapter,
	clientsLandByCulturesAdapter,
	clientsLandByDistrictAdapter,
	clientsLandByRegionsAdapter,
	clientSubsidiesAdapter,
} from './adapter'
import type {
	Client,
	ClientAnalytic,
	ClientContract,
	ClientInformalPointRef,
	ClientLastContract,
	ClientManager,
	ClientOffice,
	ClientPlot,
	ClientPoint,
	ClientSearchHint,
	ClientSubsidy,
} from './types'

const instance = axios.create({
	baseURL: `${envVars.API_URL}/api`,
})

export const clientsQuery = createEffect<
	{ clientIds: number[] },
	Pick<Client, 'guid' | 'clientId' | 'clientName' | 'clientBin' | 'clientActivity'>[]
>(async ({ clientIds }) => {
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
		return clientsAdapter(req.data)
	}

	throw new Error('status is not 200')
})

export const clientQuery = createEffect<{ clientId: number }, Client>({
	handler: async ({ clientId }) => {
		const req = await instance({
			method: 'POST',
			url: '/manager/workspace',
			data: {
				type: 'profileClient',
				action: 'getMainInf',
				clientId,
			},
		})

		return clientAdapter(req.data[0])
	},
})

export const clientsLandByRegionQuery = createEffect<
	{ regionId: number; unFollowClients?: number[] },
	Pick<ClientPlot, 'guid' | 'clientId' | 'regionId' | 'districtId' | 'plotId' | 'geometryRings'>[]
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
		return clientsLandByRegionsAdapter(req.data)
	}

	throw new Error('status is not 200')
})

export const clientsLandByCulturesQuery = createEffect<
	{ regionId: number; cultureIds: number[] },
	Pick<
		ClientPlot,
		| 'guid'
		| 'clientId'
		| 'regionId'
		| 'districtId'
		| 'plotName'
		| 'plotId'
		| 'plotArea'
		| 'plotCultId'
		| 'geometryRings'
	>[]
>(async ({ regionId, cultureIds }) => {
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
		return clientsLandByCulturesAdapter(req.data)
	}

	throw new Error('status is not 200')
})

export const clientsLandByDistrictQuery = createEffect<
	{ districtId: number },
	Pick<ClientPlot, 'guid' | 'clientId' | 'plotId' | 'geometryRings'>[]
>(async ({ districtId }) => {
	const req = await instance({
		method: 'POST',
		url: '/mainquery',
		data: {
			type: 'mainQuery',
			districtId,
		},
	})

	if (req.status === 200) {
		return clientsLandByDistrictAdapter(req.data)
	}
	throw new Error('status is not 200')
})

export const clientPlotsQuery = createEffect<{ clientId: number }, ClientPlot[]>(async ({ clientId }) => {
	const req = await instance({
		method: 'POST',
		url: '/mainquery',
		data: {
			type: 'mainQuery',
			clientId: clientId,
		},
	})

	if (req.status === 200) {
		return clientPlotsAdapter(req.data[0])
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
		return clientInformalPointRefsAdapter(req.data)
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

export const clientManagersQuery = createEffect<{ clientId: number }, ClientManager[]>(async ({ clientId }) => {
	const req = await instance({
		method: 'POST',
		url: '/manager/workspace',
		data: {
			type: 'profileClient',
			action: 'getSuppMngr',
			clientId,
		},
	})

	if (req.status === 200) {
		return req.data
	}

	throw new Error('status is not 200')
})

export const clientSubsidiesQuery = createEffect<{ clientId: number }, ClientSubsidy[]>(async ({ clientId }) => {
	const req = await instance({
		method: 'POST',
		url: '/manager/workspace',
		data: {
			type: 'profileClient',
			action: 'getSubcidies',
			clientId,
		},
	})

	if (req.status === 200) {
		return clientSubsidiesAdapter(req.data)
	}

	throw new Error('status is not 200')
})

export const clientContractsQuery = createEffect<{ clientId: number }, ClientContract[]>(async ({ clientId }) => {
	const req = await instance({
		method: 'POST',
		url: '/manager/workspace',
		data: {
			type: 'profileClient',
			action: 'getContracts',
			clientId,
		},
	})

	if (req.status === 200) {
		return clientContractsAdapter(req.data.data)
	}

	throw new Error('status is not 200')
})

export const clientLastContractQuery = createEffect<{ clientId: number }, ClientLastContract>(async ({ clientId }) => {
	const req = await instance({
		method: 'POST',
		url: '/manager/workspace',
		data: {
			type: 'profileClient',
			action: 'getLastContract',
			clientId,
		},
	})

	if (req.status === 200) {
		return req.data[0]
	}

	throw new Error('status is not 200')
})

export const clientPointsQuery = createEffect<{ clientId: number }, ClientPoint[]>(async ({ clientId }) => {
	const req = await instance({
		method: 'POST',
		url: '/manager/workspace',
		data: {
			type: 'profileClient',
			action: 'getBusinessPoint',
			clientId,
		},
	})

	if (req.status === 200) {
		return req.data
	}

	throw new Error('status is not 200')
})
