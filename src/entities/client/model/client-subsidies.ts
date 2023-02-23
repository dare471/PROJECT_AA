import { attach, createStore } from 'effector'

import { clientApi, type ClientSubsidy } from '~src/shared/api'

export function createClientSubsidies() {
	const $clientSubsidies = createStore<ClientSubsidy[]>([])
	const $clientSubsidiesPending = createStore<boolean>(false)

	const getClientSubsidies = attach({
		effect: clientApi.clientSubsidiesQuery,
	})

	$clientSubsidiesPending.on(getClientSubsidies.pending, (_, pending) => pending)
	$clientSubsidies.on(getClientSubsidies.doneData, (_, clientSubsidies) => clientSubsidies)

	return {
		$clientSubsidies,
		$clientSubsidiesPending,
		getClientSubsidies,
	}
}

export function isClientSubsidiesGuard(clientSubsidies: ClientSubsidy[]): clientSubsidies is ClientSubsidy[] {
	return Array.isArray(clientSubsidies) && clientSubsidies.length !== 0
}
