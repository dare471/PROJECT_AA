import { attach, createStore } from 'effector'

import { clientApi, type ClientContract } from '~src/shared/api'

export function createClientContracts() {
	const $clientContracts = createStore<ClientContract[]>([])
	const $clientContractsPending = createStore<boolean>(false)

	const getClientContractsFx = attach({
		effect: clientApi.clientContractsQuery,
	})

	$clientContractsPending.on(getClientContractsFx.pending, (_, pending) => pending)
	$clientContracts.on(getClientContractsFx.doneData, (_, clientContracts) => clientContracts)

	return { $clientContracts, $clientContractsPending, getClientContractsFx }
}

export function isClientContractsGuard(clientContracts: ClientContract[]): clientContracts is ClientContract[] {
	return Array.isArray(clientContracts) && clientContracts.length !== 0
}
