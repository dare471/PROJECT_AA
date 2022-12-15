import { attach, createEvent, createStore, sample } from 'effector'
import { modelFactory } from 'effector-factorio'

import { CountryAnalytic, landAnalyticApi } from '~src/shared/api'
import { CreateModal } from '~src/shared/ui'

interface CountryAnalyticModalFactoryOptions {
	open?: boolean
}

export const countryAnalyticModalFactory = modelFactory(function countryAnalyticModalFactory(
	options: CountryAnalyticModalFactoryOptions
) {
	const modalModel = CreateModal.modalFactory.createModel({
		open: options.open ?? false
	})

	const getCountryAnalytics = createEvent<void>()

	const getCountryAnalyticsFx = attach({ effect: landAnalyticApi.getCountryAnalyticsQuery })

	const $countryAnalytics = createStore<CountryAnalytic[] | null>(null)
	const $countryAnalyticsPending = getCountryAnalyticsFx.pending
	const $countryAnalyticsRows = $countryAnalytics.map((countryAnalytics) => {
		if (!countryAnalytics) return []

		return countryAnalytics.map((analytic, index) => ({
			id: index,
			category: analytic.category,
			season: analytic.season,
			count: analytic.count,
			area: analytic.area,
			cash: analytic.cash,
			factCount: analytic.factCount ?? 'Нету данных'
		}))
	})

	sample({
		clock: modalModel.openClicked,
		target: getCountryAnalytics
	})

	sample({
		clock: getCountryAnalytics,
		target: getCountryAnalyticsFx
	})

	$countryAnalytics.on(getCountryAnalyticsFx.doneData, (_, analytics) => analytics)

	return {
		$countryAnalytics,
		$countryAnalyticsRows,
		$countryAnalyticsPending,
		getCountryAnalytics,
		getCountryAnalyticsFx,
		modalModel
	}
})

// country by countries
// region by country
// district by region
// clientLand by district
// clientLandPlot by clientLand
