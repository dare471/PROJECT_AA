import { attach, createEvent, createStore, sample, Store } from 'effector'
import { modelFactory } from 'effector-factorio'

import { clientLandAnalyticApi, MarketPurchaseHistory } from '~src/shared/api'
import { CreateModal } from '~src/shared/ui'

interface MarketPurchaseHistoriesAnalyticModalFactoryOptions {
	open?: boolean
	$clientLandId: Store<number | null>
}

export const marketPurchaseHistoriesAnalyticModalFactory = modelFactory(
	function MarketPurchaseHistoriesAnalyticModalFactory(
		options: MarketPurchaseHistoriesAnalyticModalFactoryOptions
	) {
		const modalModel = CreateModal.modalFactory.createModel({
			open: options.open ?? false
		})

		const getMarketPurchaseHistoriesAnalytics = createEvent<{ clientLandId: number }>()

		const getMarketPurchaseHistoriesAnalyticsFx = attach({
			effect: clientLandAnalyticApi.getMarketPurchaseHistoriesQuery
		})

		const $marketPurchaseHistoriesAnalytics = createStore<MarketPurchaseHistory[] | null>(null)
		const $marketPurchaseHistoriesAnalyticsPending = getMarketPurchaseHistoriesAnalyticsFx.pending
		const $marketPurchaseHistoriesAnalyticsRows = $marketPurchaseHistoriesAnalytics.map(
			(marketPurchaseHistoriesAnalytics) => {
				if (!marketPurchaseHistoriesAnalytics) return []

				return marketPurchaseHistoriesAnalytics.map((analytic, index) => ({
					id: index,
					culture: analytic.culture,
					season: analytic.season,
					clientIin: analytic.clientIin,
					sumSubsidies: analytic.sumSubsidies
				}))
			}
		)
		const $buttonVisible = options.$clientLandId.map((clientLandId) => Boolean(clientLandId))

		sample({
			clock: modalModel.openClicked,
			source: options.$clientLandId,
			filter: (clientLandId: number | null): clientLandId is number => Boolean(clientLandId),
			fn: (clientLandId) => ({ clientLandId }),
			target: getMarketPurchaseHistoriesAnalytics
		})

		sample({
			clock: getMarketPurchaseHistoriesAnalytics,
			filter: modalModel.$open,
			target: getMarketPurchaseHistoriesAnalyticsFx
		})

		$marketPurchaseHistoriesAnalytics.on(
			getMarketPurchaseHistoriesAnalyticsFx.doneData,
			(_, analytics) => analytics
		)

		return {
			$marketPurchaseHistoriesAnalytics,
			$marketPurchaseHistoriesAnalyticsRows,
			$marketPurchaseHistoriesAnalyticsPending,
			$buttonVisible,
			getMarketPurchaseHistoriesAnalytics,
			getMarketPurchaseHistoriesAnalyticsFx,
			modalModel
		}
	}
)
