import { attach, createStore } from 'effector'

import { userApi, type UserClient } from '~src/shared/api'

export function createUserSubscribesClients() {
	const $userClients = createStore<UserClient[]>([])
	const $userClientsPending = createStore<boolean>(false)

	const getUserSubscribesClientsFx = attach({
		effect: userApi.userSubscribeClientsQuery,
	})

	$userClientsPending.on(getUserSubscribesClientsFx.pending, (_, pending) => pending)
	$userClients.on(getUserSubscribesClientsFx.doneData, (_, subscribeClients) => subscribeClients)

	return { getUserSubscribesClientsFx, $userClients, $userClientsPending }
}

export function createUserUnSubscribesClients() {
	const $userClients = createStore<UserClient[]>([])
	const $userClientsPending = createStore<boolean>(false)

	const getUserUnSubscribesClientsFx = attach({
		effect: userApi.userUnSubscribeClientsQuery,
	})

	$userClientsPending.on(getUserUnSubscribesClientsFx.pending, (_, pending) => pending)
	$userClients.on(getUserUnSubscribesClientsFx.doneData, (_, subscribeClients) => subscribeClients)

	return { getUserUnSubscribesClientsFx, $userClients, $userClientsPending }
}
