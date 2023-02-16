import { attach, createEvent, createStore, sample } from 'effector'

import { sessionModel } from '~src/entities/session'

import { userApi, type UserInfo } from '~src/shared/api'

export const userPublicProfilePageMounted = createEvent<{ userId: number }>()
export const userPublicProfilePageUnmounted = createEvent<void>()

export const $userInfo = createStore<UserInfo | null>(null)
export const $userInfoPending = createStore<boolean>(false)

const getUserInfoFx = attach({
	effect: userApi.userInfoQuery,
	source: sessionModel.$session,
	mapParams: (params: void, session) => {
		if (!session) throw new Error('Session is not defined')
		return { userId: session.id }
	},
})

sample({
	clock: userPublicProfilePageMounted,
	target: getUserInfoFx,
})

$userInfoPending.on(getUserInfoFx.pending, (state, pending) => pending)
$userInfo.on(getUserInfoFx.doneData, (state, userInfo) => userInfo)
