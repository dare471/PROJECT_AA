import { attach, createStore } from 'effector'

import { type Client, clientApi } from '~src/shared/api'

export function createClient() {
	const $client = createStore<Client | null>(null)
	const $contacts = $client.map((client) => (client ? client.clientContacts : []))
	const $clientPending = createStore<boolean>(false)

	const getClientFx = attach({
		effect: clientApi.clientQuery,
	})

	$clientPending.on(getClientFx.pending, (_, pending) => pending)
	$client.on(getClientFx.doneData, (_, client) => client)

	return { getClientFx, $clientPending, $client, $contacts }
}
