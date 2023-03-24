import { attach, createEvent, sample } from 'effector'

import { $$session } from '~src/entities/session'
import { createUserSubscribesClients, createUserUnSubscribesClients } from '~src/entities/user'

export const settingsSubscribesClientsPageMounted = createEvent<void>()
export const settingsSubscribesClientsPageUnmounted = createEvent<void>()

export const clientSubscribed = createEvent<number>()
export const clientUnSubscribed = createEvent<number>()

export const $$userSubscribesClients = createUserSubscribesClients()
export const $$userUnSubscribesClients = createUserUnSubscribesClients()

const getUserSubscribesClientsFx = attach({
	effect: $$userSubscribesClients.getUserSubscribesClientsFx,
	source: $$session.$session,
	mapParams: (params: void, session) => {
		if (!session) throw new Error('Session is not defined')
		return { userId: session.id }
	},
})
const getUserUnSubscribesClientsFx = attach({
	effect: $$userUnSubscribesClients.getUserUnSubscribesClientsFx,
	source: $$session.$session,
	mapParams: (params: void, session) => {
		if (!session) throw new Error('Session is not defined')
		return { userId: session.id }
	},
})
const subscribesClientsFx = attach({ effect: $$session.subscribesClientsFx })
const unSubscribesClientsFx = attach({ effect: $$session.unSubscribesClientsFx })

sample({
	clock: settingsSubscribesClientsPageMounted,
	target: [getUserSubscribesClientsFx, getUserUnSubscribesClientsFx],
})

sample({
	clock: clientSubscribed,
	fn: (clientId) => ({ clientIds: [clientId] }),
	target: subscribesClientsFx,
})

sample({
	clock: subscribesClientsFx.done,
	target: [getUserSubscribesClientsFx, getUserUnSubscribesClientsFx],
})

sample({
	clock: clientUnSubscribed,
	fn: (clientId) => ({ clientIds: [clientId] }),
	target: unSubscribesClientsFx,
})

sample({
	clock: unSubscribesClientsFx.done,
	target: [getUserSubscribesClientsFx, getUserUnSubscribesClientsFx],
})
