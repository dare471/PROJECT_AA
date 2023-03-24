import { attach, createStore } from 'effector'

import { userApi, type UserMapHistory } from '~src/shared/api'

export function createUserMapHistories() {
	const $userMapHistories = createStore<UserMapHistory[]>([])
	const $userMapHistoriesPending = createStore<boolean>(false)

	const getUserMapHistoriesFx = attach({
		effect: userApi.userMapHistoriesQuery,
	})

	$userMapHistoriesPending.on(getUserMapHistoriesFx.pending, (_, pending) => pending)
	$userMapHistories.on(getUserMapHistoriesFx.doneData, (_, userMapHistories) => userMapHistories)

	return {
		getUserMapHistoriesFx,
		$userMapHistories,
		$userMapHistoriesPending,
	}
}
