import { attach, createStore } from 'effector'
import { reset, status } from 'patronum'

import { clientApi, type ClientPlot } from '~src/shared/api'

export function createClientPlots() {
	const getClientPlotsFx = attach({
		effect: clientApi.clientPlotsQuery,
	})

	const $clientPlots = createStore<ClientPlot[]>([])
	const $clientPlotsStatus = status({ effect: getClientPlotsFx })

	$clientPlots.on(getClientPlotsFx.doneData, (_, clientPlots) => clientPlots)
	const resetClientPlots = reset({ target: $clientPlots })

	return {
		getClientPlotsFx,
		resetClientPlots,
		$clientPlots,
		$clientPlotsStatus,
	}
}
