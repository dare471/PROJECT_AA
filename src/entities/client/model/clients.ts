import { attach, createStore } from 'effector'

import { type Client, clientApi } from '~src/shared/api'

export function createClients() {
	const $clients = createStore<Pick<Client, 'guid' | 'clientId' | 'clientName' | 'clientBin' | 'clientActivity'>[]>([])
	const $clientsPending = createStore<boolean>(false)

	const getClientsFx = attach({
		effect: clientApi.clientsQuery,
	})

	$clientsPending.on(getClientsFx.pending, (_, pending) => pending)
	$clients.on(getClientsFx.doneData, (_, clients) => clients)

	return {
		getClientsFx,
		$clientsPending,
		$clients,
	}
}
