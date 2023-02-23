import { attach, createStore } from 'effector'

import { sessionModel } from '~src/entities/session'

import { userApi, type UserMapHistory } from '~src/shared/api'

export function createUserMapHistories() {
	const $userMapHistories = createStore<UserMapHistory[]>([])
	const $userMapHistoriesPending = createStore<boolean>(false)

	const getUserMapHistoriesFx = attach({
		effect: userApi.userMapHistoriesQuery,
		source: sessionModel.$session,
		mapParams: (params: void, session) => {
			if (!session) throw new Error('Session is not defined')
			return { userId: session.id }
		},
	})

	$userMapHistoriesPending.on(getUserMapHistoriesFx.pending, (_, pending) => pending)
	$userMapHistories.on(getUserMapHistoriesFx.doneData, (_, userMapHistories) => userMapHistories)

	return {
		getUserMapHistoriesFx,
		$userMapHistories,
		$userMapHistoriesPending,
	}
}
