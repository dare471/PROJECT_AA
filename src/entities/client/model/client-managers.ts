import { attach, createStore } from 'effector'

import { clientApi, type ClientManager } from '~src/shared/api'

export function createClientManagers() {
	const $clientManagers = createStore<ClientManager[]>([])
	const $clientMangersPending = createStore<boolean>(false)

	const getClientManagersFx = attach({
		effect: clientApi.clientManagersQuery,
	})

	$clientMangersPending.on(getClientManagersFx.pending, (_, pending) => pending)
	$clientManagers.on(getClientManagersFx.doneData, (_, clientManagers) => clientManagers)

	return {
		$clientManagers,
		$clientMangersPending,
		getClientManagersFx,
	}
}
