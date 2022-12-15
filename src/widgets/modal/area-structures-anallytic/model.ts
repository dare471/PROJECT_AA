import { attach, createEvent, createStore, sample, Store } from 'effector'
import { modelFactory } from 'effector-factorio'

import { AreaStructure, clientLandAnalyticApi } from '~src/shared/api'
import { CreateModal } from '~src/shared/ui'

interface AreaStructuresAnalyticModalFactoryOptions {
	open?: boolean
	$clientLandId: Store<number | null>
}

export const areaStructuresAnalyticModalFactory = modelFactory(
	function AreaStructuresAnalyticModalFactory(options: AreaStructuresAnalyticModalFactoryOptions) {
		const modalModel = CreateModal.modalFactory.createModel({
			open: options.open ?? false
		})

		const getAreaStructuresAnalytics = createEvent<{ clientLandId: number }>()

		const getAreaStructuresAnalyticsFx = attach({
			effect: clientLandAnalyticApi.getAreaStructuresQuery
		})

		const $areaStructuresAnalytics = createStore<AreaStructure[] | null>(null)
		const $areaStructuresAnalyticsPending = getAreaStructuresAnalyticsFx.pending
		const $areaStructuresAnalyticsRows = $areaStructuresAnalytics.map((areaStructuresAnalytics) => {
			if (!areaStructuresAnalytics) return []

			return areaStructuresAnalytics.map((analytic, index) => ({
				id: index,
				culture: analytic.culture,
				season: analytic.season,
				clientIinbin: analytic.clientIinbin,
				area: analytic.area
			}))
		})
		const $buttonVisible = options.$clientLandId.map((clientLandId) => Boolean(clientLandId))

		sample({
			clock: modalModel.openClicked,
			source: options.$clientLandId,
			filter: (clientLandId: number | null): clientLandId is number => Boolean(clientLandId),
			fn: (clientLandId) => ({ clientLandId }),
			target: getAreaStructuresAnalytics
		})

		sample({
			clock: getAreaStructuresAnalytics,
			filter: modalModel.$open,
			target: getAreaStructuresAnalyticsFx
		})

		$areaStructuresAnalytics.on(getAreaStructuresAnalyticsFx.doneData, (_, analytics) => analytics)

		return {
			$areaStructuresAnalytics,
			$areaStructuresAnalyticsRows,
			$areaStructuresAnalyticsPending,
			getAreaStructuresAnalytics,
			getAreaStructuresAnalyticsFx,
			$buttonVisible,
			modalModel
		}
	}
)
