import { attach, createStore } from 'effector'

import { type ClientAnalytic, clientApi } from '~src/shared/api'

export function createClientAnalyticsByYear() {
	const $clientAnalytics = createStore<ClientAnalytic[]>([])
	const $clientAnalyticsByYear = $clientAnalytics.map((clientAnalytics) =>
		clientAnalytics.reduce((acc, clientAnalytic) => {
			const { year } = clientAnalytic
			if (!acc[year]) acc[year] = []
			acc[year]!.push(clientAnalytic)
			return acc
		}, {} as Record<string, ClientAnalytic[]>),
	)

	const $clientAnalyticsPending = createStore<boolean>(false)

	const getClientAnalyticsFx = attach({
		effect: clientApi.clientAnalyticsQuery,
	})

	$clientAnalyticsPending.on(getClientAnalyticsFx.pending, (_, pending) => pending)
	$clientAnalytics.on(getClientAnalyticsFx.doneData, (_, clientAnalytics) => clientAnalytics)

	return { getClientAnalyticsFx, $clientAnalyticsPending, $clientAnalytics, $clientAnalyticsByYear }
}
