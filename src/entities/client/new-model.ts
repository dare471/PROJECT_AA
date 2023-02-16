import { attach, createStore } from 'effector'

import { clientApi, type ClientInfo } from '~src/shared/api'

export function createClientInfo() {
	const $clientInfo = createStore<ClientInfo | null>(null)

	const getClientInfoFx = attach({ effect: clientApi.clientInfoQuery })
}
