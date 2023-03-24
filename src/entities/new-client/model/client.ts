import { attach, createStore } from 'effector'
import { reset } from 'patronum'

import { type Client, clientApi } from '~src/shared/api'

export function createClient() {
	const $client = createStore<Client | null>(null)
	const $clientPending = createStore<boolean>(false)

	const getClientFx = attach({
		effect: clientApi.clientQuery,
	})

	$clientPending.on(getClientFx.pending, (_, pending) => pending)
	$client.on(getClientFx.doneData, (_, client) => client)
	const resetClient = reset({ target: $client })

	return {
		getClientFx,
		resetClient,
		$client,
		$clientPending,
	}
}
