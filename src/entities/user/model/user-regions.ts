import { attach, createStore } from 'effector'

import { $$session } from '~src/entities/session'

import { userApi, type UserRegion } from '~src/shared/api'

export function createUserSubscribesRegions() {
	const $userRegions = createStore<UserRegion[]>([])
	const $userRegionsPending = createStore<boolean>(false)

	const getUserSubscribesRegionsFx = attach({
		effect: userApi.userSubscribeRegionsQuery,
		source: $$session.$session,
		mapParams: (params: void, session) => {
			if (!session) throw new Error('session is null')
			return {
				userId: session.id,
			}
		},
	})

	$userRegionsPending.on(getUserSubscribesRegionsFx.pending, (_, pending) => pending)
	$userRegions.on(getUserSubscribesRegionsFx.doneData, (_, subscribeRegions) => subscribeRegions)

	return { getUserSubscribesRegionsFx, $userRegions, $userRegionsPending }
}

export function createUserUnSubscribesRegions() {
	const $userRegions = createStore<UserRegion[]>([])
	const $userRegionsPending = createStore<boolean>(false)

	const getUserUnSubscribesRegionsFx = attach({
		effect: userApi.userUnSubscribeRegionsQuery,
		source: $$session.$session,
		mapParams: (params: void, session) => {
			if (!session) throw new Error('session is null')
			return {
				userId: session.id,
			}
		},
	})

	$userRegionsPending.on(getUserUnSubscribesRegionsFx.pending, (_, pending) => pending)
	$userRegions.on(getUserUnSubscribesRegionsFx.doneData, (_, subscribeRegions) => subscribeRegions)

	return { getUserUnSubscribesRegionsFx, $userRegions, $userRegionsPending }
}
