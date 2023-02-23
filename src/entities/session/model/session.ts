import { attach, combine, createEvent, createStore, sample } from 'effector'
import { persist } from 'effector-storage/local'

import { authApi, favoriteClientApi, type Session, type SessionHook, type UserCredentials } from '~src/shared/api'

export const signedIn = createEvent<void>()
export const signedOut = createEvent<void>()

export const favoriteClientsAdded = createEvent<number[]>()
export const favoriteClientsDeleted = createEvent<number[]>()

export const subscribeRegionsAdded = createEvent<number[]>()
export const subscribeRegionsDeleted = createEvent<number[]>()

export const subscribeClientsAdded = createEvent<number[]>()
export const subscribeClientsDeleted = createEvent<number[]>()

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
const addFavoriteClientsFx = attach({
	effect: favoriteClientApi.addClientFavoriteMutation,
	source: $session,
	mapParams: (params: { clientIds: number[] }, session) => {
		if (!session) throw new Error('Session is not defined')
		return { userId: session.id, clientIds: params.clientIds }
	},
})
const deleteFavoriteClientsFx = attach({
	effect: favoriteClientApi.deleteClientFavoriteMutation,
	source: $session,
	mapParams: (params: { clientIds: number[] }, session) => {
		if (!session) throw new Error('Session is not defined')
		return { userId: session.id, clientIds: params.clientIds }
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

sample({
	clock: favoriteClientsAdded,
	fn: (clientIds) => ({ clientIds }),
	target: addFavoriteClientsFx,
})
$session.on(addFavoriteClientsFx.done, (session, { params }) => {
	if (!session) return null
	return {
		...session,
		favoriteClients: [...session.favoriteClients, ...params.clientIds],
	}
})

sample({
	clock: favoriteClientsDeleted,
	fn: (clientIds) => ({ clientIds }),
	target: deleteFavoriteClientsFx,
})
$session.on(deleteFavoriteClientsFx.done, (session, { params }) => {
	if (!session) return null
	return {
		...session,
		favoriteClients: session.favoriteClients.filter((id) => !params.clientIds.includes(id)),
	}
})

$session.on(subscribeRegionsAdded, (session, regionIds) => {
	if (!session) return null
	return {
		...session,
		subscribeRegions: [...session.subscribeRegions, ...regionIds],
	}
})

$session.on(subscribeRegionsDeleted, (session, regionIds) => {
	if (!session) return null
	return {
		...session,
		subscribeRegions: session.subscribeRegions.filter((id) => !regionIds.includes(id)),
	}
})

$session.on(subscribeClientsAdded, (session, clientIds) => {
	if (!session) return null
	return {
		...session,
		subscribeClients: [...session.subscribeClients, ...clientIds],
	}
})

$session.on(subscribeClientsDeleted, (session, clientIds) => {
	if (!session) return null
	return {
		...session,
		subscribeClients: session.subscribeClients.filter((id) => !clientIds.includes(id)),
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
		subscribeClients: session.user.unFollowClients,
		subscribeRegions: session.user.subscribesRegion,
		favoriteClients: session.user.favoriteClients,
		token: session.token,
	}
}

function sessionHookAdapter(
	sessionHook: SessionHook,
): Pick<Session, 'active' | 'subscribeRegions' | 'subscribeClients' | 'favoriteClients'> {
	return {
		active: sessionHook.active === 1 ? true : false,
		subscribeRegions: sessionHook.subscribesRegion,
		subscribeClients: sessionHook.unFollowClients,
		favoriteClients: sessionHook.favoriteClients,
	}
}
