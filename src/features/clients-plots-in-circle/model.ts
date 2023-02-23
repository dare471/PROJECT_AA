import { attach, createEffect, createEvent, createStore, type Event, sample, type Store } from 'effector'

import { type Client, clientApi, type ClientPlot } from '~src/shared/api'

interface ClientsInCircle {
	circleId: number
	clientsPlots: Pick<ClientPlot, 'guid' | 'clientId' | 'geometryRings'>[]
	clients: Pick<Client, 'guid' | 'clientId' | 'clientName' | 'clientBin' | 'clientActivity'>[]
}

type ClientsPlotsInCircleResult = {
	circleDrawn: Event<{
		circleId: number
		clientsPlots: Pick<ClientPlot, 'guid' | 'clientId' | 'geometryRings'>[]
	}>
	handleCircleDraw: Event<any>
	circleRemoved: Event<{ circleId: number }>
	handleCircleRemove: Event<any>
	allCircleRemoved: Event<void>
	handleAllCircleRemove: Event<any>
	__isMulti: boolean
}

type ClientsPlotsInCircleResultMulti = {
	$circles: Store<ClientsInCircle[]>
	$circlesClients: Store<Pick<Client, 'guid' | 'clientId' | 'clientName' | 'clientBin' | 'clientActivity'>[]>
	$circlesClientsPlots: Store<Pick<ClientPlot, 'guid' | 'clientId' | 'geometryRings'>[]>
} & ClientsPlotsInCircleResult

type ClientsPlotsInCircleResultSingle = {
	$circle: Store<ClientsInCircle | null>
	$circleClients: Store<Pick<Client, 'guid' | 'clientId' | 'clientName' | 'clientBin' | 'clientActivity'>[]>
	$circleClientsPlots: Store<Pick<ClientPlot, 'guid' | 'clientId' | 'geometryRings'>[]>
} & ClientsPlotsInCircleResult

export function createClientsPlotsInCircle<T extends true>(options: { isMulti: T }): ClientsPlotsInCircleResultMulti
export function createClientsPlotsInCircle<T extends false>(options: { isMulti: T }): ClientsPlotsInCircleResultSingle
export function createClientsPlotsInCircle<T extends boolean>(options: {
	isMulti: T
}): ClientsPlotsInCircleResultMulti | ClientsPlotsInCircleResultSingle {
	const { isMulti } = options

	const circleDrawn = createEvent<{
		circleId: number
		clientsPlots: Pick<ClientPlot, 'guid' | 'clientId' | 'geometryRings'>[]
	}>()
	const handleCircleDraw = createEvent<any>()
	const circleRemoved = createEvent<{ circleId: number }>()
	const handleCircleRemove = createEvent<any>()
	const allCircleRemoved = createEvent<void>()
	const handleAllCircleRemove = createEvent<any>()

	const getClientsFx = attach({ effect: clientApi.clientsQuery })
	const createCircleClientsFx = createEffect<
		{ circleId: number; clientIds: number[] },
		{ circleId: number; clients: Pick<Client, 'guid' | 'clientId' | 'clientName' | 'clientBin' | 'clientActivity'>[] }
	>().use(async ({ circleId, clientIds }) => {
		const uniqueClientIds = new Set(clientIds)
		const clients = await getClientsFx({ clientIds: Array.from(uniqueClientIds) })
		return { circleId, clients }
	})

	if (isMulti) {
		const $circles = createStore<ClientsInCircle[]>([])
		const $circlesClients = $circles.map((circles) => {
			return circles.reduce((acc, circle) => {
				if (circle.clients.length === 0) return acc
				acc.push(...circle.clients)
				return acc
			}, [] as Pick<Client, 'guid' | 'clientId' | 'clientName' | 'clientBin' | 'clientActivity'>[])
		})
		const $circlesClientsPlots = $circles.map((circles) => {
			return circles.reduce((acc, circle) => {
				if (circle.clientsPlots.length === 0) return acc
				acc.push(...circle.clientsPlots)
				return acc
			}, [] as Pick<ClientPlot, 'guid' | 'clientId' | 'geometryRings'>[])
		})

		$circles.on(circleDrawn, (circles, circle) => [
			...circles,
			{ circleId: circle.circleId, clientsPlots: circle.clientsPlots, clients: [] },
		])

		sample({
			clock: circleDrawn,
			fn: ({ circleId, clientsPlots }) => ({ circleId, clientIds: clientsPlots.map((plot) => plot.clientId) }),
			target: createCircleClientsFx,
		})

		$circles.on(createCircleClientsFx.doneData, (circles, { circleId, clients }) =>
			circles.map((circle) => (circle.circleId === circleId ? { ...circle, clients } : circle)),
		)

		$circles.on(circleRemoved, (circles, { circleId }) => circles.filter((circle) => circle.circleId !== circleId))
		$circles.on(allCircleRemoved, () => [])

		return {
			circleDrawn,
			handleCircleDraw,
			circleRemoved,
			handleCircleRemove,
			allCircleRemoved,
			handleAllCircleRemove,
			$circles,
			$circlesClients,
			$circlesClientsPlots,
			__isMulti: isMulti,
		}
	} else {
		const $circle = createStore<ClientsInCircle | null>(null)
		const $circleClients = $circle.map((circle) => (circle ? circle.clients : []))
		const $circleClientsPlots = $circle.map((circle) => (circle ? circle.clientsPlots : []))

		$circle.on(circleDrawn, (_, circle) => ({
			circleId: circle.circleId,
			clientsPlots: circle.clientsPlots,
			clients: [],
		}))

		sample({
			clock: circleDrawn,
			fn: ({ circleId, clientsPlots }) => ({ circleId, clientIds: clientsPlots.map((plot) => plot.clientId) }),
			target: createCircleClientsFx,
		})

		$circle.on(createCircleClientsFx.doneData, (circle, { clients }) =>
			circle
				? {
						...circle,
						clients,
				  }
				: null,
		)

		$circle.on(circleRemoved, () => null)
		$circle.on(allCircleRemoved, () => null)

		return {
			circleDrawn,
			handleCircleDraw,
			circleRemoved,
			handleCircleRemove,
			allCircleRemoved,
			handleAllCircleRemove,
			$circle,
			$circleClients,
			$circleClientsPlots,
			__isMulti: isMulti,
		}
	}
}
