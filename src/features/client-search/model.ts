import { attach, createEvent, createStore, sample, type Store } from 'effector'
import { modelFactory } from 'effector-factorio'
import { debounce } from 'patronum'

import { clientApi, type ClientSearchHint } from '~src/shared/api'

export interface CreateClientSearchOptions {
	districtId: Store<number | null>
}

export const createClientSearch = modelFactory(function createClientSearch(options: CreateClientSearchOptions) {
	const { districtId } = options

	const searchTypeChanged = createEvent<void>()

	const clientNameChanged = createEvent<string>()
	const clientBinChanged = createEvent<string>()

	const clientHintClicked = createEvent<number | null>()

	const $searchType = createStore<'name' | 'bin'>('name')

	const $clientName = createStore('')
	const $clientBin = createStore('')

	const $clientHints = createStore<ClientSearchHint[]>([])
	const $clientNameOptions = $clientHints.map((clientSearchHints) =>
		clientSearchHints.map((clientSearchHint) => ({
			label: clientSearchHint.clientName,
			value: clientSearchHint.clientId,
		})),
	)
	const $clientBinOptions = $clientHints.map((clientSearchHints) =>
		clientSearchHints.map((clientSearchHint) => ({
			label: clientSearchHint.clientBin,
			value: clientSearchHint.clientId,
		})),
	)
	const $currentClientHint = createStore<ClientSearchHint | null>(null)
	const $clientHintNameOption = $currentClientHint.map((currentClientHint) =>
		currentClientHint ? { label: currentClientHint.clientName, value: Number(currentClientHint.clientId) } : null,
	)
	const $clientHintBinOption = $currentClientHint.map((currentClientHint) =>
		currentClientHint ? { label: currentClientHint.clientBin, value: Number(currentClientHint.clientId) } : null,
	)
	const $clientHintsPending = createStore<boolean>(false)

	const getClientHintsByNameFx = attach({
		effect: clientApi.clientSearchHintsQuery,
		source: { districtId, clientName: $clientName },
		mapParams: (params: void, { districtId, clientName }) => {
			if (!districtId) throw new Error('districtId is null')
			if (clientName === '') throw new Error('clientName is empty')
			return { districtId, clientName }
		},
	})

	const getClientHintsByBinFx = attach({
		effect: clientApi.clientSearchHintsQuery,
		source: { districtId, clientBin: $clientBin },
		mapParams: (params: void, { districtId, clientBin }) => {
			if (!districtId) throw new Error('districtId is null')
			if (clientBin === '') throw new Error('clientBin is empty')
			return { districtId, clientBin: Number(clientBin) }
		},
	})

	$clientName.on(clientNameChanged, (_, value) => value)
	$clientBin.on(clientBinChanged, (_, value) => value)

	$searchType.on(searchTypeChanged, (type) => (type === 'name' ? 'bin' : 'name'))

	debounce({
		source: $clientName as any,
		timeout: 500,
		target: getClientHintsByNameFx,
	})

	debounce({
		source: $clientBin as any,
		timeout: 500,
		target: getClientHintsByBinFx,
	})

	$clientHintsPending.on([getClientHintsByNameFx.pending, getClientHintsByBinFx.pending], (_, pending) => pending)
	$clientHints.on(
		[getClientHintsByNameFx.doneData, getClientHintsByBinFx.doneData],
		(_, clientSearchHints) => clientSearchHints,
	)
	$clientHints.reset(getClientHintsByNameFx, getClientHintsByBinFx, $searchType)
	$clientName.reset($searchType)
	$clientBin.reset($searchType)

	sample({
		clock: clientHintClicked,
		source: $clientHints,
		fn: (clientHints, clientId) =>
			clientHints.find((clientSearchHint) => clientSearchHint.clientId === clientId) ?? null,
		target: $currentClientHint,
	})

	return {
		searchTypeChanged,
		clientNameChanged,
		clientBinChanged,
		clientHintClicked,
		$searchType,
		$clientName,
		$clientBin,
		$clientHints,
		$clientNameOptions,
		$clientBinOptions,
		$clientHintsPending,
		$districtId: districtId,
		$currentClientHint,
		$clientHintNameOption,
		$clientHintBinOption,
	}
})
