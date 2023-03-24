import { attach, createStore } from 'effector'
import { reset } from 'patronum'

import { clientApi, type ClientPoint } from '~src/shared/api'

export function createClientPoints() {
	const $clientPoints = createStore<ClientPoint[]>([])
	const $clientPointsPending = createStore<boolean>(false)

	const getClientPointsFx = attach({
		effect: clientApi.clientPointsQuery,
	})

	$clientPointsPending.on(getClientPointsFx.pending, (_, pending) => pending)
	$clientPoints.on(getClientPointsFx.doneData, (_, clientPoint) => clientPoint)
	const resetClientPoints = reset({ target: $clientPoints })

	return {
		getClientPointsFx,
		resetClientPoints,
		$clientPoints,
		$clientPointsPending,
	}
}
