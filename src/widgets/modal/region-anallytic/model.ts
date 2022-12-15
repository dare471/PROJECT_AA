import { attach, createEvent, createStore, sample, Store } from 'effector'
import { modelFactory } from 'effector-factorio'

import { landAnalyticApi, RegionAnalytic } from '~src/shared/api'
import { CreateModal } from '~src/shared/ui'

interface RegionAnalyticModalFactoryOptions {
	open?: boolean
	$regionId: Store<number | null>
}

export const regionAnalyticModalFactory = modelFactory(function regionAnalyticModalFactory(
	options: RegionAnalyticModalFactoryOptions
) {
	const modalModel = CreateModal.modalFactory.createModel({
		open: options.open ?? false
	})

	const getRegionAnalytics = createEvent<{ regionId: number }>()

	const getRegionAnalyticsFx = attach({ effect: landAnalyticApi.getRegionAnalyticsQuery })

	const $regionAnalytics = createStore<RegionAnalytic[] | null>(null)
	const $regionAnalyticsPending = getRegionAnalyticsFx.pending
	const $regionAnalyticsRows = $regionAnalytics.map((regionAnalytics) => {
		if (!regionAnalytics) return []

		return regionAnalytics.map((analytic, index) => ({
			id: index,
			category: analytic.category,
			season: analytic.season,
			count: analytic.count,
			area: analytic.area,
			cash: analytic.cash,
			factCount: analytic.factCount ?? 'Нету данных'
		}))
	})
	const $buttonVisible = options.$regionId.map((regionId) => Boolean(regionId))

	sample({
		clock: modalModel.openClicked,
		source: options.$regionId,
		filter: (regionId: number | null): regionId is number => Boolean(regionId),
		fn: (regionId) => ({ regionId }),
		target: getRegionAnalytics
	})

	sample({
		clock: getRegionAnalytics,
		filter: modalModel.$open,
		target: getRegionAnalyticsFx
	})

	$regionAnalytics.on(getRegionAnalyticsFx.doneData, (_, analytics) => analytics)

	return {
		$regionAnalytics,
		$regionAnalyticsRows,
		$regionAnalyticsPending,
		$buttonVisible,
		getRegionAnalytics,
		getRegionAnalyticsFx,
		modalModel
	}
})
