import * as turf from '@turf/turf'
import { attach, createEffect, createStore } from 'effector'

import { clientApi, type ClientPlot } from '~src/shared/api'

export const filterClientsPlotsInCircleFx = createEffect<
	{ event: any; clientsPlots: Pick<ClientPlot, 'guid' | 'clientId' | 'geometryRings'>[] },
	{ circleId: number; clientsPlots: Pick<ClientPlot, 'guid' | 'clientId' | 'geometryRings'>[] }
>(({ event, clientsPlots }) => {
	const layer = event.layer as any
	const id = layer._leaflet_id as number
	const center = layer.getLatLng()
	const radius = Math.floor(layer.getRadius())
	const polygon = turf.circle([center.lng, center.lat], radius, {
		units: 'meters',
	})
	const filterClientsPlots = clientsPlots.filter((plot) => {
		const result: boolean[] = []

		for (const coord of plot.geometryRings[0]!) {
			const point = turf.point([coord[1]!, coord[0]!])
			const within = turf.booleanPointInPolygon(point, polygon)
			result.push(within)
		}

		return result.includes(true)
	})
	return { circleId: id, clientsPlots: filterClientsPlots }
})

export function createClientPlots() {
	const $clientPlots = createStore<ClientPlot[]>([])
	const $client = $clientPlots.map((clientPlots) =>
		clientPlots.length !== 0
			? {
					guid: clientPlots[0]!.guid,
					clientId: clientPlots[0]!.clientId,
					clientName: clientPlots[0]!.clientName,
					clientBin: clientPlots[0]!.clientBin,
					clientAddress: clientPlots[0]!.clientAddress,
					clientActivity: clientPlots[0]!.clientActivity,
					regionId: clientPlots[0]!.regionId,
					districtId: clientPlots[0]!.districtId,
			  }
			: null,
	)
	const $clientPlotsPending = createStore<boolean>(false)

	const getClientPlotsFx = attach({
		effect: clientApi.clientPlotsQuery,
	})

	$clientPlotsPending.on(getClientPlotsFx.pending, (_, pending) => pending)
	$clientPlots.on(getClientPlotsFx.doneData, (_, clientPlots) => clientPlots)

	return { getClientPlotsFx, $clientPlotsPending, $clientPlots, $client }
}
