import { attach, createStore } from 'effector'
import { reset, status } from 'patronum'

import { clientApi, type ClientContract } from '~src/shared/api'

export function createClientContracts() {
	const $clientContracts = createStore<ClientContract[]>([])
	const $clientContractsPending = createStore<boolean>(false)

	const getClientContractsFx = attach({
		effect: clientApi.clientContractsQuery,
	})

	$clientContractsPending.on(getClientContractsFx.pending, (_, pending) => pending)
	$clientContracts.on(getClientContractsFx.doneData, (_, clientContracts) => clientContracts)
	const resetClientContracts = reset({ target: $clientContracts })

	return { getClientContractsFx, resetClientContracts, $clientContracts, $clientContractsPending }
}
