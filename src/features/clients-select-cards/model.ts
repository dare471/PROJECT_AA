import { createEvent, createStore, sample, type Store } from 'effector'

import { type Client } from '~src/shared/api'

interface CreateClientsSelect<T extends Pick<Client, 'clientId'>> {
	clients: Store<T[]>
}

export function createClientsSelect<T extends Pick<Client, 'clientId'>>(options: CreateClientsSelect<T>) {
	const { clients: $clients } = options

	const clientSelected = createEvent<number>()
	const allClientsSelected = createEvent<boolean>()

	const $selectClientIds = createStore<number[]>([])

	$selectClientIds.on(clientSelected, (clientIds, clientId) => {
		if (clientIds.includes(clientId)) {
			return clientIds.filter((id) => id !== clientId)
		}
		return [...clientIds, clientId]
	})

	sample({
		clock: allClientsSelected,
		source: $clients,
		fn: (clients, allSelect) => {
			console.log(allSelect)
			if (allSelect) {
				return clients.map(({ clientId }) => clientId)
			}
			return []
		},
		target: $selectClientIds,
	})

	return { clientSelected, allClientsSelected, $clients, $selectClientIds }
}
