import { attach, createEvent, createStore, sample, Store } from 'effector'
import { modelFactory } from 'effector-factorio'

import { clientLandAnalyticApi, PurchaseHistory } from '~src/shared/api'
import { CreateModal } from '~src/shared/ui'

interface PurchaseHistoriesAnalyticModalFactoryOptions {
	open?: boolean
	$clientLandId: Store<number | null>
}

export const purchaseHistoriesAnalyticModalFactory = modelFactory(
	function PurchaseHistoriesAnalyticModalFactory(
		options: PurchaseHistoriesAnalyticModalFactoryOptions
	) {
		const modalModel = CreateModal.modalFactory.createModel({
			open: options.open ?? false
		})

		const getPurchaseHistoriesAnalytics = createEvent<{ clientLandId: number }>()

		const getPurchaseHistoriesAnalyticsFx = attach({
			effect: clientLandAnalyticApi.getPurchaseHistoriesQuery
		})

		const $purchaseHistoriesAnalytics = createStore<PurchaseHistory[] | null>(null)
		const $purchaseHistoriesAnalyticsPending = getPurchaseHistoriesAnalyticsFx.pending
		const $purchaseHistoriesAnalyticsRows = $purchaseHistoriesAnalytics.map(
			(purchaseHistoriesAnalytics) => {
				if (!purchaseHistoriesAnalytics) return []

				return purchaseHistoriesAnalytics.map((analytic, index) => ({
					id: index,
					culture: analytic.culture,
					season: analytic.season,
					clientIinbin: analytic.clientIinbin,
					cash: analytic.cash
				}))
			}
		)
		const $buttonVisible = options.$clientLandId.map((clientLandId) => Boolean(clientLandId))

		sample({
			clock: modalModel.openClicked,
			source: options.$clientLandId,
			filter: (clientLandId: number | null): clientLandId is number => Boolean(clientLandId),
			fn: (clientLandId) => ({ clientLandId }),
			target: getPurchaseHistoriesAnalytics
		})

		sample({
			clock: getPurchaseHistoriesAnalytics,
			filter: modalModel.$open,
			target: getPurchaseHistoriesAnalyticsFx
		})

		$purchaseHistoriesAnalytics.on(
			getPurchaseHistoriesAnalyticsFx.doneData,
			(_, analytics) => analytics
		)

		return {
			$purchaseHistoriesAnalytics,
			$purchaseHistoriesAnalyticsRows,
			$purchaseHistoriesAnalyticsPending,
			$buttonVisible,
			getPurchaseHistoriesAnalytics,
			getPurchaseHistoriesAnalyticsFx,
			modalModel
		}
	}
)
