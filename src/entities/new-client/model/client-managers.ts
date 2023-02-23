import { attach, createStore } from 'effector'
import { reset, status } from 'patronum'

import { clientApi, type ClientManager } from '~src/shared/api'

export function createClientManagers() {
	const getClientManagersFx = attach({
		effect: clientApi.clientManagersQuery,
	})

	const $clientManagers = createStore<ClientManager[]>([])
	const $clientManagersStatus = status({
		effect: getClientManagersFx,
	})

	$clientManagers.on(getClientManagersFx.doneData, (_, clientManagers) => clientManagers)
	const resetClientManagers = reset({ target: $clientManagers })

	return { getClientManagersFx, resetClientManagers, $clientManagers, $clientManagersStatus }
}
