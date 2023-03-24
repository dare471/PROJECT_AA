import { attach, createStore } from 'effector'
import { reset } from 'patronum'

import { clientApi, type ClientSubsidy } from '~src/shared/api'

export function createClientSubsidies() {
	const $clientSubsidies = createStore<ClientSubsidy[]>([])
	const $clientSubsidiesPending = createStore<boolean>(false)

	const getClientSubsidiesFx = attach({
		effect: clientApi.clientSubsidiesQuery,
	})

	$clientSubsidiesPending.on(getClientSubsidiesFx.pending, (_, pending) => pending)
	$clientSubsidies.on(getClientSubsidiesFx.doneData, (_, clientSubsidies) => clientSubsidies)
	const resetClientSubsidies = reset({ target: [$clientSubsidies] })

	return {
		getClientSubsidiesFx,
		resetClientSubsidies,
		$clientSubsidies,
		$clientSubsidiesPending,
	}
}
