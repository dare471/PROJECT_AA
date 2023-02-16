import { attach, combine, createEvent, createStore } from 'effector'
import { persist } from 'effector-storage/local'

import { authApi, type Session, type UserCredentials } from '~src/shared/api'

export const signedOut = createEvent<void>()
export const signedIn = createEvent<void>()
export const clientsFavoriteAdded = createEvent<number[]>()
export const clientsFavoriteDeleted = createEvent<number[]>()

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

persist({ store: $session, key: 'user' })

$session.on(signInFx.doneData, (_, session) => sessionAdapter(session))

$session.on(getSessionHookFx.doneData, (session, sessionHook) => {
	if (!session) return null
	return {
		...session,
		active: sessionHook.active,
		subscribeRegions: sessionHook.subscribesRegion,
		unFollowClients: sessionHook.unFollowClients,
		favoriteClients: sessionHook.favoriteClients,
	}
})

$session.on(signedOut, () => null)

$session.on(clientsFavoriteAdded, (session, clientIds) => {
	if (!session) return null
	return {
		...session,
		favoriteClients: [...session.favoriteClients, ...clientIds],
	}
})

$session.on(clientsFavoriteDeleted, (session, clientIds) => {
	if (!session) return null
	return {
		...session,
		favoriteClients: session.favoriteClients.filter((id) => !clientIds.includes(id)),
	}
})

function sessionAdapter(session: UserCredentials): Session {
	return {
		id: session.user.id,
		active: session.user.active,
		name: session.user.name,
		email: session.user.email,
		role: session.user.access_availability,
		unFollowClients: session.user.unFollowClients,
		subscribeRegions: session.user.subscribesRegion,
		favoriteClients: session.user.favoriteClients,
		token: session.token,
	}
}
