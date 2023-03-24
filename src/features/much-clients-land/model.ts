import { createStore } from 'effector'
import { reset } from 'patronum'

import { createClientsLandByCultures, createClientsLandByRegion } from '~src/entities/new-client'

import { type ClientPlot } from '~src/shared/api'

type ClientLand = Pick<ClientPlot, 'guid' | 'clientId' | 'plotId' | 'geometryRings'>

export function createMuchClientsLand() {
	const $clientsLand = createStore<ClientLand[]>([])
	const $clientsLandPending = createStore<boolean>(false)

	const $$clientsLandByRegion = createClientsLandByRegion()
	const $$clientsLandByCultures = createClientsLandByCultures()

	$clientsLandPending.on(
		[$$clientsLandByRegion.$clientsLandPending, $$clientsLandByCultures.$clientsLandPending],
		(_, pending) => pending,
	)
	$clientsLand.on(
		[$$clientsLandByRegion.$clientsLand, $$clientsLandByCultures.$clientsLand],
		(_, clientsLand) => clientsLand,
	)

	const resetClientsLand = reset({
		target: [$clientsLand, $$clientsLandByRegion.$clientsLand, $$clientsLandByCultures.$clientsLand],
	})

	return {
		resetClientsLand,
		$clientsLand,
		$clientsLandPending,
		$$clientsLandByRegion,
		$$clientsLandByCultures,
	}
}
