import { attach, createStore } from 'effector'

import { type User, userApi } from '~src/shared/api'

export function createUser() {
	const $user = createStore<User | null>(null)
	const $userPending = createStore<boolean>(false)

	const getUserFx = attach({ effect: userApi.userQuery })

	$userPending.on(getUserFx.pending, (_, pending) => pending)
	$user.on(getUserFx.doneData, (_, user) => user)

	return { $user, $userPending, getUserFx }
}
