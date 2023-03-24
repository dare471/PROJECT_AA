import { attach, createStore } from 'effector'
import { reset } from 'patronum'

import { clientApi, type ClientManager } from '~src/shared/api'

export function createClientManagers() {
	const $clientManagers = createStore<ClientManager[]>([])
	const $clientManagersPending = createStore<boolean>(false)

	const getClientManagersFx = attach({
		effect: clientApi.clientManagersQuery,
	})

	$clientManagersPending.on(getClientManagersFx.pending, (_, pending) => pending)
	$clientManagers.on(getClientManagersFx.doneData, (_, clientManagers) => clientManagers)
	const resetClientManagers = reset({ target: [$clientManagers] })

	return { getClientManagersFx, resetClientManagers, $clientManagers, $clientManagersPending }
}
