import { attach, createStore } from 'effector'
import { reset } from 'patronum'

import { sessionModel } from '~src/entities/session'

import { clientApi, type ClientPlot, type ClientPlotByCultures, type ClientPlotByRegion } from '~src/shared/api'

export function createClientsLand() {
	const $clientsLandByRegion = createStore<ClientPlotByRegion[]>([])
	const $clientsLandByCultures = createStore<ClientPlotByCultures[]>([])
	const $clientsLand = createStore<
		Pick<ClientPlot, 'guid' | 'clientId' | 'regionId' | 'districtId' | 'plotId' | 'geometryRings'>[]
	>([])
	const $clientsLandPending = createStore<boolean>(false)

	const getClientsLandByRegionFx = attach({
		effect: clientApi.clientsLandByRegionQuery,
		source: sessionModel.$session,
		mapParams: (params: { regionId: number }, session) => {
			const { regionId } = params
			if (!session) throw new Error('Session is not defined')
			return { regionId, unFollowClients: session.subscribeClients }
		},
	})
	const getClientsLandByCulturesFx = attach({
		effect: clientApi.clientsLandByCulturesQuery,
	})

	$clientsLandPending.on(
		[getClientsLandByRegionFx.pending, getClientsLandByCulturesFx.pending],
		(_, pending) => pending,
	)
	$clientsLandByRegion.on(getClientsLandByRegionFx.doneData, (_, clientsLand) => clientsLand)
	$clientsLandByCultures.on(getClientsLandByCulturesFx.doneData, (_, clientsLand) => clientsLand)
	$clientsLand.on([$clientsLandByRegion, $clientsLandByCultures], (_, clientsLand) => clientsLand)

	reset({
		clock: [getClientsLandByRegionFx, getClientsLandByCulturesFx],
		target: [$clientsLandByRegion, $clientsLandByCultures, $clientsLand],
	})

	return {
		getClientsLandByRegionFx,
		getClientsLandByCulturesFx,
		$clientsLandPending,
		$clientsLandByRegion,
		$clientsLandByCultures,
		$clientsLand,
	}
}
