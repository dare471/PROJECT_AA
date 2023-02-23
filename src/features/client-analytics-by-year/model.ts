import { createClientAnalytics } from '~src/entities/new-client'

import { type ClientAnalytic } from '~src/shared/api'

export function createClientAnalyticsByYear() {
	const $$clientAnalytics = createClientAnalytics()

	const $clientAnalyticsByYear = $$clientAnalytics.$clientAnalytics.map((clientAnalytics) =>
		clientAnalytics.reduce((acc, clientAnalytic) => {
			const { year } = clientAnalytic
			if (!acc[year]) acc[year] = []
			acc[year]!.push(clientAnalytic)
			return acc
		}, {} as Record<string, ClientAnalytic[]>),
	)

	return { ...$$clientAnalytics, $clientAnalyticsByYear }
}
