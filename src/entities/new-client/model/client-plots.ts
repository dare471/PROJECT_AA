import { attach, createStore } from 'effector'
import { reset } from 'patronum'

import { type Client, clientApi, type ClientPlot } from '~src/shared/api'

export function createClientPlots() {
	const $clientPlots = createStore<ClientPlot[]>([])
	const $client = $clientPlots.map<Omit<Client, 'clientContacts' | 'clientCato'> | null>((clientPlots) =>
		clientPlots[0]
			? {
					guid: clientPlots[0].guid,
					clientId: clientPlots[0].clientId,
					clientName: clientPlots[0].clientName,
					clientBin: Number(clientPlots[0].clientBin),
					clientAddress: clientPlots[0].clientAddress,
					clientActivity: clientPlots[0].clientActivity,
					regionId: clientPlots[0].regionId,
					districtId: clientPlots[0].districtId,
			  }
			: null,
	)
	const $clientPlotsPending = createStore<boolean>(false)

	const getClientPlotsFx = attach({
		effect: clientApi.clientPlotsQuery,
	})

	$clientPlotsPending.on(getClientPlotsFx.pending, (_, pending) => pending)
	$clientPlots.on(getClientPlotsFx.doneData, (_, clientPlots) => clientPlots)
	const resetClientPlots = reset({ target: $clientPlots })

	return {
		getClientPlotsFx,
		resetClientPlots,
		$clientPlots,
		$client,
		$clientPlotsPending,
	}
}
