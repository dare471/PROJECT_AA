import { attach, createStore } from 'effector'
import { reset } from 'patronum'

import { type ClientAnalytic, clientApi } from '~src/shared/api'

export function createClientAnalytics() {
	const $clientAnalytics = createStore<ClientAnalytic[]>([])
	const $clientAnalyticsPending = createStore<boolean>(false)

	const getClientAnalyticsFx = attach({
		effect: clientApi.clientAnalyticsQuery,
	})

	$clientAnalyticsPending.on(getClientAnalyticsFx.pending, (_, pending) => pending)
	$clientAnalytics.on(getClientAnalyticsFx.doneData, (_, clientAnalytics) => clientAnalytics)
	const resetClientAnalytics = reset({ target: $clientAnalytics })

	return {
		getClientAnalyticsFx,
		resetClientAnalytics,
		$clientAnalytics,
		$clientAnalyticsPending,
	}
}
