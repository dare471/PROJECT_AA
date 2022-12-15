import { attach, createEvent, createStore, sample, Store } from 'effector'
import { modelFactory } from 'effector-factorio'

import { clientLandAnalyticApi, PotentialCulture } from '~src/shared/api'
import { CreateModal } from '~src/shared/ui'

interface PotentialCulturesAnalyticModalFactoryOptions {
	open?: boolean
	$clientLandId: Store<number | null>
}

export const potentialCulturesAnalyticModalFactory = modelFactory(
	function PotentialCulturesAnalyticModalFactory(
		options: PotentialCulturesAnalyticModalFactoryOptions
	) {
		const modalModel = CreateModal.modalFactory.createModel({
			open: options.open ?? false
		})

		const getPotentialCulturesAnalytics = createEvent<{ clientLandId: number }>()

		const getPotentialCulturesAnalyticsFx = attach({
			effect: clientLandAnalyticApi.getPotentialCulturesQuery
		})

		const $potentialCulturesAnalytics = createStore<PotentialCulture[] | null>(null)
		const $potentialCulturesAnalyticsPending = getPotentialCulturesAnalyticsFx.pending
		const $potentialCulturesAnalyticsRows = $potentialCulturesAnalytics.map(
			(potentialCulturesAnalytics) => {
				if (!potentialCulturesAnalytics) return []

				return potentialCulturesAnalytics.map((analytic, index) => ({
					id: index,
					culture: analytic.culture,
					clientIinbin: analytic.clientIinbin,
					area: analytic.area,
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
			target: getPotentialCulturesAnalytics
		})

		sample({
			clock: getPotentialCulturesAnalytics,
			filter: modalModel.$open,
			target: getPotentialCulturesAnalyticsFx
		})

		$potentialCulturesAnalytics.on(
			getPotentialCulturesAnalyticsFx.doneData,
			(_, analytics) => analytics
		)

		return {
			$potentialCulturesAnalytics,
			$potentialCulturesAnalyticsRows,
			$potentialCulturesAnalyticsPending,
			$buttonVisible,
			getPotentialCulturesAnalytics,
			getPotentialCulturesAnalyticsFx,
			modalModel
		}
	}
)
