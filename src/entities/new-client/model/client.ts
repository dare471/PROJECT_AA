import { attach, createStore } from 'effector'
import { reset, status } from 'patronum'

import { type Client, clientApi } from '~src/shared/api'

export function createClient() {
	const getClientFx = attach({
		effect: clientApi.clientQuery,
	})

	const $client = createStore<Client | null>(null)
	const $clientStatus = status({ effect: getClientFx })

	$client.on(getClientFx.doneData, (_, client) => client)
	const resetClient = reset({ target: $client })

	return {
		getClientFx,
		resetClient,
		$client,
		$clientStatus,
	}
}
