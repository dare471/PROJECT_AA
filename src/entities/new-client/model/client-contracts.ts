import { attach, createStore } from 'effector'
import { reset, status } from 'patronum'

import { clientApi, type ClientContract } from '~src/shared/api'

export function createClientContracts() {
	const getClientContractsFx = attach({
		effect: clientApi.clientContractsQuery,
	})

	const $clientContracts = createStore<ClientContract[]>([])
	const $clientContractsStatus = status({
		effect: getClientContractsFx,
	})

	$clientContracts.on(getClientContractsFx.doneData, (_, clientContracts) => clientContracts)
	const resetClientContracts = reset({ target: $clientContracts })

	return { getClientContractsFx, resetClientContracts, $clientContracts, $clientContractsStatus }
}
