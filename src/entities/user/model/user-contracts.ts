import { attach, createStore } from 'effector'

import { userApi, type UserContract } from '~src/shared/api'

export function createUserContracts() {
	const $userContracts = createStore<UserContract[]>([])
	const $userContractsPending = createStore<boolean>(false)

	const getUserContractsFx = attach({
		effect: userApi.userContractsQuery,
	})

	$userContractsPending.on(getUserContractsFx.pending, (_, pending) => pending)
	$userContracts.on(getUserContractsFx.doneData, (_, userContracts) => userContracts)

	return { $userContracts, $userContractsPending, getUserContractsFx }
}
