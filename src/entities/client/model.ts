import { attach, createEvent, createStore, sample, type Store } from 'effector'

import { clientApi } from '~src/shared/api'

interface CreateClientFavoriteOptions {
	userId: Store<number | null>
}

export function createClientFavorite(options: CreateClientFavoriteOptions) {
	const { userId } = options

	const clientSelected = createEvent<number>()
	const allClientSelected = createEvent<number[]>()

	const addClientsFavoriteClicked = createEvent<void>()
	const addClientFavoriteClicked = createEvent<number>()

	const $selectedClients = createStore<number[]>([])

	const addClientsFavoriteFx = attach({
		effect: clientApi.addClientFavoriteMutation,
		source: userId,
		mapParams: (params: { clientIds: number[] }, userId) => {
			const { clientIds } = params
			if (!userId) throw new Error('UserId is not defined')
			return { clientIds, userId }
		},
	})

	const addClientFavoriteFx = attach({
		effect: clientApi.addClientFavoriteMutation,
		source: userId,
		mapParams: (params: { clientId: number }, userId) => {
			const { clientId } = params
			if (!userId) throw new Error('UserId is not defined')
			return { clientIds: [clientId], userId }
		},
	})

	$selectedClients.on(clientSelected, (state, clientId) => {
		if (state.includes(clientId)) return state.filter((id) => id !== clientId)
		return [...state, clientId]
	})
	$selectedClients.on(allClientSelected, (state, clientIds) => {
		if (state.length === clientIds.length) return []
		return clientIds
	})

	sample({
		clock: addClientsFavoriteClicked,
		source: $selectedClients,
		filter: (selectClients) => selectClients.length !== 0,
		fn: (selectClients) => ({ clientIds: selectClients }),
		target: addClientsFavoriteFx,
	})

	sample({
		clock: addClientFavoriteClicked,
		fn: (clientId) => ({ clientId }),
		target: addClientFavoriteFx,
	})

	$selectedClients.reset(addClientsFavoriteFx.done)

	return {
		clientSelected,
		allClientSelected,
		addClientsFavoriteClicked,
		addClientFavoriteClicked,
		addClientsFavoriteFx,
		addClientFavoriteFx,
		$selectedClients,
	}
}
