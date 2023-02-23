import { createStore, merge } from 'effector'
import { type EffectState } from 'patronum/status'

import { createClientsLandByCultures, createClientsLandByRegion } from '~src/entities/new-client'

import { type ClientPlot } from '~src/shared/api'

type ClientLand = Pick<ClientPlot, 'guid' | 'clientId' | 'plotId' | 'geometryRings'>

export function createMuchClientsLand() {
	const $clientsLand = createStore<ClientLand[]>([])
	const $clientsLandStatus = createStore<EffectState>('initial')

	const $$clientsLandByRegion = createClientsLandByRegion()
	const $$clientsLandByCultures = createClientsLandByCultures()

	$clientsLand.on(
		[$$clientsLandByRegion.$clientsLand, $$clientsLandByCultures.$clientsLand],
		(_, clientsLand) => clientsLand,
	)
	$clientsLandStatus.on(
		[$$clientsLandByRegion.$clientsLandStatus, $$clientsLandByCultures.$clientsLandStatus],
		(_, status) => status,
	)

	const resetMuchClientsLand = merge([$$clientsLandByRegion.resetClientsLand, $$clientsLandByCultures.resetClientsLand])

	return {
		resetMuchClientsLand,
		$clientsLand,
		$clientsLandStatus,
		$$clientsLandByRegion,
		$$clientsLandByCultures,
	}
}
