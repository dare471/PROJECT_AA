import { attach, createStore } from 'effector'

import { clientApi, type ClientLastContract } from '~src/shared/api'

export function createClientLastContract() {
	const $clientLastContract = createStore<ClientLastContract | null>(null)
	const $clientLastContractPending = createStore<boolean>(false)

	const getClientLastContractFx = attach({
		effect: clientApi.clientLastContractQuery,
	})

	$clientLastContractPending.on(getClientLastContractFx.pending, (_, pending) => pending)
	$clientLastContract.on(getClientLastContractFx.doneData, (_, clientLastContract) => clientLastContract)

	return {
		getClientLastContractFx,
		$clientLastContract,
		$clientLastContractPending,
	}
}
