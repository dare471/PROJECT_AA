import { attach, createStore } from 'effector'

import { clientApi, type ClientPoint } from '~src/shared/api'

export function createClientPoints() {
	const $clientPoints = createStore<ClientPoint[]>([])
	const $clientPointsPending = createStore<boolean>(false)

	const getClientPointsFx = attach({
		effect: clientApi.clientPointsQuery,
	})

	$clientPointsPending.on(getClientPointsFx.pending, (_, pending) => pending)
	$clientPoints.on(getClientPointsFx.doneData, (_, clientPoints) => clientPoints)

	return {
		getClientPointsFx,
		$clientPoints,
		$clientPointsPending,
	}
}
