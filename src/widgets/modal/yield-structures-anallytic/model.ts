import { attach, createEvent, createStore, sample, Store } from 'effector'
import { modelFactory } from 'effector-factorio'

import { clientLandAnalyticApi, YieldStructure } from '~src/shared/api'
import { CreateModal } from '~src/shared/ui'

interface YieldStructuresAnalyticModalFactoryOptions {
	open?: boolean
	$clientLandId: Store<number | null>
}

export const yieldStructuresAnalyticModalFactory = modelFactory(
	function YieldStructuresAnalyticModalFactory(
		options: YieldStructuresAnalyticModalFactoryOptions
	) {
		const modalModel = CreateModal.modalFactory.createModel({
			open: options.open ?? false
		})

		const getYieldStructuresAnalytics = createEvent<{ clientLandId: number }>()

		const getYieldStructuresAnalyticsFx = attach({
			effect: clientLandAnalyticApi.getYieldStructuresQuery
		})

		const $yieldStructuresAnalytics = createStore<YieldStructure[] | null>(null)
		const $yieldStructuresAnalyticsPending = getYieldStructuresAnalyticsFx.pending
		const $yieldStructureRows = $yieldStructuresAnalytics.map((yieldStructuresAnalytics) => {
			if (!yieldStructuresAnalytics) return []

			return yieldStructuresAnalytics.map((analytic, index) => ({
				id: index,
				culture: analytic.culture,
				season: analytic.season,
				clientIinbin: analytic.clientIinbin,
				cropCapacity: analytic.cropCapacity
			}))
		})
		const $buttonVisible = options.$clientLandId.map((clientLandId) => Boolean(clientLandId))

		sample({
			clock: modalModel.openClicked,
			source: options.$clientLandId,
			filter: (clientLandId: number | null): clientLandId is number => Boolean(clientLandId),
			fn: (clientLandId) => ({ clientLandId }),
			target: getYieldStructuresAnalytics
		})

		sample({
			clock: getYieldStructuresAnalytics,
			filter: modalModel.$open,
			target: getYieldStructuresAnalyticsFx
		})

		$yieldStructuresAnalytics.on(
			getYieldStructuresAnalyticsFx.doneData,
			(_, analytics) => analytics
		)

		return {
			$yieldStructuresAnalytics,
			$yieldStructureRows,
			$yieldStructuresAnalyticsPending,
			$buttonVisible,
			getYieldStructuresAnalytics,
			getYieldStructuresAnalyticsFx,
			modalModel
		}
	}
)
