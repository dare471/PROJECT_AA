import { attach, combine, createEvent, createStore, sample, type Store } from 'effector'
import { modelFactory } from 'effector-factorio'

import type { ClientLand, ClientLandPlot, ClientLandPlotCulture } from '~src/shared/api'
import { clientLandApi } from '~src/shared/api'

interface ClientLandFactoryOptions {
	$viewClientLand: Store<boolean>
}

export const clientLandFactory = modelFactory(function clientLandFactory(
	options: ClientLandFactoryOptions
) {
	const clientLandClicked = createEvent<{ id: number }>()
	const clientLandPlotClicked = createEvent<{ id: number }>()
	const getClientsLand = createEvent<{ id: number }>()
	const getClientsLandPlotsCultures = createEvent<{ regionId: number; cultIds: number[] }>()
	const resetClientsLandPlotsCultures = createEvent<void>()
	const getClientLandPlots = createEvent<{ clientId: number }>()
	const clientLandPlotGuidToggled = createEvent<void>()

	const getClientsLandFromRegionFx = attach({
		effect: clientLandApi.getClientsLandFromRegionsQuery
	})
	const getClientsLandPlotsCulturesFx = attach({
		effect: clientLandApi.getClientsLandPlotsCulturesQuery
	})
	const getClientLandPlotsFx = attach({
		effect: clientLandApi.getClientLandPlots
	})

	const $clientsLand = createStore<ClientLand[] | null>(null)
	const $clientsLandPlotsCultures = createStore<ClientLandPlotCulture[] | null>(null)
	const $clientLandId = createStore<number | null>(null)
	const $clientLandPlots = createStore<ClientLandPlot[] | null>(null)
	const $clientLandPlotId = createStore<number | null>(null)
	const $isClientLandPlotGuid = createStore<boolean>(false)

	const $clientLand = combine($clientsLand, $clientLandId, (clientsLand, clientLandId) => {
		if (!clientsLand || !clientLandId) return null

		return clientsLand.find((clientLand) => clientLand.clientId === clientLandId) ?? null
	})
	const $clientLandPlot = combine(
		$clientLandPlots,
		$clientLandId,
		$clientLandPlotId,
		(clientLandPlots, clientLandId, clientLandPlotId) => {
			if (!clientLandPlots || !clientLandId || !clientLandPlotId) return null

			const clientLand = clientLandPlots.find(
				(clientLandPlot) => clientLandPlot.clientId === clientLandId
			)
			const clientLandPlot = clientLand?.linkPlot.find((plot) => plot.plotId === clientLandPlotId)

			return clientLandPlot ?? null
		}
	)

	$clientLandId.on(clientLandClicked, (_, { id }) => id)
	$clientLandPlotId.on(clientLandPlotClicked, (_, { id }) => id)

	$clientsLand.reset(getClientsLand)

	sample({
		clock: getClientsLand,
		fn: ({ id }) => ({ regionId: id }),
		filter: options.$viewClientLand,
		target: getClientsLandFromRegionFx
	})

	$clientsLand.on(getClientsLandFromRegionFx.doneData, (_, clientsLand) => clientsLand)

	sample({
		clock: getClientsLandPlotsCultures,
		fn: ({ regionId, cultIds }) => ({ id: regionId, cultIds }),
		target: getClientsLandPlotsCulturesFx
	})

	$clientsLandPlotsCultures.on(
		getClientsLandPlotsCulturesFx.doneData,
		(_, clientsLandPlotsCultures) => clientsLandPlotsCultures
	)

	sample({
		clock: $clientLandId,
		filter: (clientLandId: number | null): clientLandId is number => Boolean(clientLandId),
		fn: (clientLandId) => ({ clientId: clientLandId }),
		target: [getClientLandPlots, $clientLandPlotId.reinit!]
	})

	sample({
		clock: getClientLandPlots,
		target: getClientLandPlotsFx
	})

	$clientLandPlots.on(getClientLandPlotsFx.doneData, (_, clientLandPlots) => clientLandPlots)

	$clientsLandPlotsCultures.reset(resetClientsLandPlotsCultures)

	$isClientLandPlotGuid.on(clientLandPlotGuidToggled, (prev) => !prev)

	return {
		clientLandClicked,
		clientLandPlotClicked,
		$clientsLand,
		$clientLand,
		$clientLandId,
		$clientLandPlots,
		$clientLandPlotId,
		$clientLandPlot,
		$clientsLandPlotsCultures,
		$isClientLandPlotGuid,
		getClientsLand,
		getClientsLandPlotsCultures,
		getClientLandPlots,
		resetClientsLandPlotsCultures,
		clientLandPlotGuidToggled,
		getClientsLandFromRegionFx,
		getClientsLandPlotsCulturesFx,
		getClientLandPlotsFx
	}
})
