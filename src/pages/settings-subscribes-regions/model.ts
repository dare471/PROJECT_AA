import { attach, createEvent, sample } from 'effector'

import { $$session } from '~src/entities/session'
import { createUserSubscribesRegions, createUserUnSubscribesRegions } from '~src/entities/user'

import { type Session } from '~src/shared/api'

export const settingsSubscribesRegionsPageMounted = createEvent<void>()
export const settingsSubscribesRegionsPageUnmounted = createEvent<void>()

export const regionsSubscribed = createEvent<number>()
export const regionsUnSubscribed = createEvent<number>()

export const $$userSubscribesRegions = createUserSubscribesRegions()
export const $$userUnSubscribesRegions = createUserUnSubscribesRegions()

const getUserSubscribesRegionsFx = attach({
	effect: $$userSubscribesRegions.getUserSubscribesRegionsFx,
	source: $$session.$session,
	mapParams: (params: void, session) => {
		if (!session) throw new Error('Session is not defined')
		return { userId: session.id }
	},
})
const getUserUnSubscribesRegionsFx = attach({
	effect: $$userUnSubscribesRegions.getUserUnSubscribesRegionsFx,
	source: $$session.$session,
	mapParams: (params: void, session) => {
		if (!session) throw new Error('Session is not defined')
		return { userId: session.id }
	},
})
const subscribeRegionsFx = attach({ effect: $$session.subscribesRegionsFx })
const unSubscribeRegionsFx = attach({ effect: $$session.unSubscribesRegionsFx })

sample({
	clock: settingsSubscribesRegionsPageMounted,
	source: $$session.$session,
	filter: (session: Session | null): session is Session => session !== null,
	fn: (session) => ({ userId: session.id }),
	target: [getUserSubscribesRegionsFx, getUserUnSubscribesRegionsFx],
})

sample({
	clock: regionsSubscribed,
	fn: (regionId) => ({ regionIds: [regionId] }),
	target: subscribeRegionsFx,
})

sample({
	clock: subscribeRegionsFx.done,
	target: [getUserSubscribesRegionsFx, getUserUnSubscribesRegionsFx],
})

sample({
	clock: regionsUnSubscribed,
	fn: (regionId) => ({ regionIds: [regionId] }),
	target: unSubscribeRegionsFx,
})

sample({
	clock: unSubscribeRegionsFx.done,
	target: [getUserSubscribesRegionsFx, getUserUnSubscribesRegionsFx],
})
