import { attach, createStore } from 'effector'
import { reset, status } from 'patronum'

import { clientApi, type ClientLastContract } from '~src/shared/api'

export function createClientLastContract() {
	const getClientLastContractFx = attach({
		effect: clientApi.clientLastContractQuery,
	})

	const $clientLastContract = createStore<ClientLastContract | null>(null)
	const $clientLastContractStatus = status({ effect: getClientLastContractFx })

	$clientLastContract.on(getClientLastContractFx.doneData, (_, clientLastContract) => clientLastContract)
	const resetClientLastContract = reset({ target: $clientLastContract })

	return {
		getClientLastContractFx,
		resetClientLastContract,
		$clientLastContract,
		$clientLastContractStatus,
	}
}
