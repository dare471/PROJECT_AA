import { attach, createStore } from 'effector'
import { reset, status } from 'patronum'

import { type ClientAnalytic, clientApi } from '~src/shared/api'

export function createClientAnalytics() {
	const getClientAnalyticsFx = attach({
		effect: clientApi.clientAnalyticsQuery,
	})

	const $clientAnalytics = createStore<ClientAnalytic[]>([])
	const $clientAnalyticsStatus = status({ effect: getClientAnalyticsFx })

	$clientAnalytics.on(getClientAnalyticsFx.doneData, (_, clientAnalytics) => clientAnalytics)
	const resetClientAnalytics = reset({ target: $clientAnalytics })

	return {
		getClientAnalyticsFx,
		resetClientAnalytics,
		$clientAnalytics,
		$clientAnalyticsStatus,
	}
}
