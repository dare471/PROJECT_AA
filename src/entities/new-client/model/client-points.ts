import { attach, createStore } from 'effector'
import { reset, status } from 'patronum'

import { clientApi, type ClientPoint } from '~src/shared/api'

export function createClientPoints() {
	const getClientPointsFx = attach({
		effect: clientApi.clientPointsQuery,
	})

	const $clientPoints = createStore<ClientPoint[]>([])
	const $clientPointsStatus = status({
		effect: getClientPointsFx,
	})

	$clientPoints.on(getClientPointsFx.doneData, (_, clientPoint) => clientPoint)
	const resetClientPoints = reset({ target: $clientPoints })

	return {
		getClientPointsFx,
		resetClientPoints,
		$clientPoints,
		$clientPointsStatus,
	}
}
