import { attach, createEvent, createStore, sample, type Store } from 'effector'
import L from 'leaflet'

import { clientApi, type ClientLandPlot } from '~src/shared/api'

interface CreateClientPlotsOptions {
	map: Store<L.Map | null>
}

export function createClientPlots(options: CreateClientPlotsOptions) {
	const { map } = options

	const clientPlotSettled = createEvent<number>()

	const $clientPlots = createStore<ClientLandPlot[]>([])
	const $clientPlotId = createStore<number | null>(null)
	const $clientPlot = createStore<ClientLandPlot | null>(null)
	const $clientPlotsPending = createStore<boolean>(false)

	const fitBoundsClientPlotsFx = attach({
		source: { map, clientPlots: $clientPlots },
		effect: ({ map, clientPlots }, params: void): void => {
			if (!map) throw new Error('Map is not defined')
			if (clientPlots.length === 0) throw new Error('Client plots is empty')

			const geometry_rings: number[][][] = []
			for (const clientPlot of clientPlots) {
				geometry_rings.push(clientPlot.geometry_rings[0]!)
			}

			const bounds = L.polygon(geometry_rings as any).getBounds()
			map.fitBounds(bounds)
		},
	})
	const getClientPlotsFx = attach({ effect: clientApi.clientPlotsQuery })

	$clientPlotsPending.on(getClientPlotsFx.pending, (state, pending) => pending)
	$clientPlots.on(getClientPlotsFx.doneData, (state, clientPlots) => clientPlots)

	$clientPlotId.on(clientPlotSettled, (state, clientPlotId) => clientPlotId)
	clientPlotSettled.watch(console.log)

	sample({
		clock: $clientPlotId,
		source: $clientPlots,
		fn: (clientPlots, clientPlotId) => clientPlots.find((clientPlot) => clientPlot.plotId === clientPlotId) ?? null,
		target: $clientPlot,
	})

	return {
		clientPlotSettled,
		getClientPlotsFx,
		fitBoundsClientPlotsFx,
		$clientPlots,
		$clientPlotId,
		$clientPlot,
		$clientPlotsPending,
	}
}
