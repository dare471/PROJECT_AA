import { attach, combine, createEvent, createStore, sample } from 'effector'
import { persist } from 'effector-storage/local'

import {
	authApi,
	favoriteClientApi,
	type Session,
	type SessionHook,
	userApi,
	type UserCredentials,
} from '~src/shared/api'

export const signedIn = createEvent<void>()
export const signedOut = createEvent<void>()

export const $session = createStore<Session | null>(null)
export const $sessionPending = createStore<boolean>(false)

export const $isAuth = combine($session, (session) => session !== null)
export const $role = combine($session, (session) => session?.role ?? [0])

export const signInFx = attach({ effect: authApi.signInQuery })
export const getSessionHookFx = attach({
	effect: authApi.sessionHookQuery,
	source: $session,
	mapParams: (params: void, session) => {
		if (!session) throw new Error('Session is not defined')
		return { userId: session.id }
	},
})
export const addFavoriteClientsFx = attach({
	effect: favoriteClientApi.addClientFavoriteMutation,
	source: $session,
	mapParams: (params: { clientIds: number[] }, session) => {
		if (!session) throw new Error('Session is not defined')
		return { userId: session.id, clientIds: params.clientIds }
	},
})
export const deleteFavoriteClientsFx = attach({
	effect: favoriteClientApi.deleteClientFavoriteMutation,
	source: $session,
	mapParams: (params: { clientIds: number[] }, session) => {
		if (!session) throw new Error('Session is not defined')
		return { userId: session.id, clientIds: params.clientIds }
	},
})

export const subscribesRegionsFx = attach({
	effect: userApi.addUserSubscribeRegionsMutation,
	source: $session,
	mapParams: (params: { regionIds: number[] }, session) => {
		if (!session) throw new Error('Session is not defined')
		return { userId: session.id, regionIds: [...session.subscribeRegions, ...params.regionIds] }
	},
})
export const unSubscribesRegionsFx = attach({
	effect: userApi.addUserSubscribeRegionsMutation,
	source: $session,
	mapParams: (params: { regionIds: number[] }, session) => {
		if (!session) throw new Error('Session is not defined')
		return { userId: session.id, regionIds: session.subscribeRegions.filter((id) => !params.regionIds.includes(id)) }
	},
})

export const subscribesClientsFx = attach({
	effect: userApi.addUserUnSubscribeClientsMutation,
	source: $session,
	mapParams: (params: { clientIds: number[] }, session) => {
		if (!session) throw new Error('Session is not defined')
		return { userId: session.id, clientIds: session.unSubscribeClients.filter((id) => !params.clientIds.includes(id)) }
	},
})
export const unSubscribesClientsFx = attach({
	effect: userApi.addUserUnSubscribeClientsMutation,
	source: $session,
	mapParams: (params: { clientIds: number[] }, session) => {
		if (!session) throw new Error('Session is not defined')
		return { userId: session.id, clientIds: [...session.unSubscribeClients, ...params.clientIds] }
	},
})

persist({ store: $session, key: 'session' })

$sessionPending.on(signInFx.pending, (_, pending) => pending)
$session.on(signInFx.doneData, (_, session) => sessionAdapter(session))

$session.on(getSessionHookFx.doneData, (session, sessionHook) => {
	if (!session) return null
	return {
		...session,
		...sessionHookAdapter(sessionHook),
	}
})

$session.on(addFavoriteClientsFx.done, (session, { params }) => {
	if (!session) return null
	return {
		...session,
		favoriteClients: [...session.favoriteClients, ...params.clientIds],
	}
})

$session.on(deleteFavoriteClientsFx.done, (session, { params }) => {
	if (!session) return null
	return {
		...session,
		favoriteClients: session.favoriteClients.filter((id) => !params.clientIds.includes(id)),
	}
})

$session.on(subscribesRegionsFx.done, (session, { params }) => {
	if (!session) return null
	return {
		...session,
		subscribeRegions: [...session.subscribeRegions, ...params.regionIds],
	}
})
$session.on(unSubscribesRegionsFx.done, (session, { params }) => {
	if (!session) return null
	return {
		...session,
		subscribeRegions: session.subscribeRegions.filter((id) => !params.regionIds.includes(id)),
	}
})

$session.on(subscribesClientsFx.done, (session, { params }) => {
	if (!session) return null
	return {
		...session,
		unSubscribeClients: session.unSubscribeClients.filter((id) => !params.clientIds.includes(id)),
	}
})
$session.on(unSubscribesClientsFx.done, (session, { params }) => {
	if (!session) return null
	return {
		...session,
		unSubscribeClients: [...session.unSubscribeClients, ...params.clientIds],
	}
})

$session.on(signedOut, () => null)

function sessionAdapter(session: UserCredentials): Session {
	return {
		id: session.user.id,
		active: session.user.active === 1 ? true : false,
		name: session.user.name,
		email: session.user.email,
		role: session.user.access_availability,
		unSubscribeClients: session.user.unFollowClients,
		subscribeRegions: session.user.subscribesRegion,
		favoriteClients: session.user.favoriteClients,
		token: session.token,
	}
}

function sessionHookAdapter(
	sessionHook: SessionHook,
): Pick<Session, 'active' | 'subscribeRegions' | 'unSubscribeClients' | 'favoriteClients'> {
	return {
		active: sessionHook.active === 1 ? true : false,
		subscribeRegions: sessionHook.subscribesRegion,
		unSubscribeClients: sessionHook.unFollowClients,
		favoriteClients: sessionHook.favoriteClients,
	}
}
