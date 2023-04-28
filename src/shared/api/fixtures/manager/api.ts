import axios from 'axios'
import { createEffect } from 'effector'

import { envVars } from '~src/shared/config'

import { ManagerAdapter } from './adapter'
import type { ManagersFromTo, ManagersFromToManager, ManagersSalesResult } from './types.api'

const instance = axios.create({
	baseURL: envVars.API_URL,
})

export const managersFromToManagerQuery = createEffect<void, Array<ManagersFromTo>>(async () => {
	const url = '/api/contest'
	const request = await instance.post(url)

	if (request.status === 200) return ManagerAdapter.fromApiToCountries(request.data)

	throw new Error('Status is not 200')
})

export const managersSalesResultQuery = createEffect<void, ManagersSalesResult>(async () => {
	const url = '/api/contest/progress'
	const request = await instance.post(url)

	if (request.status === 200) return request.data
	throw new Error('Status is not 200')
})

export const allManagersQuery = createEffect<void, Array<ManagersFromToManager>>(async () => {
	const url = '/api/contest/allusers'
	const request = await instance.post(url)

	if (request.status === 200) return request.data
	throw new Error('Status is not 200')
})
