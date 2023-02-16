import { NumberIncrementStepper } from '@chakra-ui/react'
import { attach, createEvent, createStore, sample, type Store } from 'effector'
import { modelFactory } from 'effector-factorio'
import { debounce } from 'patronum'

import { clientApi, type ClientSearchHint } from '~src/shared/api'

export interface CreateClientSearchOptions {
	districtId: Store<number | null>
}

export const createClientSearch = modelFactory(function createClientSearch(options: CreateClientSearchOptions) {
	const { districtId } = options

	const clientSearchTypeChanged = createEvent<void>()

	const clientNameFieldChanged = createEvent<string>()
	const clientBinFieldChanged = createEvent<string>()

	const clientHintClicked = createEvent<number>()

	const $clientSearchType = createStore<'name' | 'bin'>('name')

	const $clientNameField = createStore('')
	const $clientBinField = createStore('')

	const $clientSearchHints = createStore<ClientSearchHint[]>([])
	const $clientSearchNameOptions = $clientSearchHints.map((clientSearchHints) =>
		clientSearchHints.map((clientSearchHint) => ({
			label: clientSearchHint.clientName,
			value: clientSearchHint.clientId,
		})),
	)
	const $clientSearchBinOptions = $clientSearchHints.map((clientSearchHints) =>
		clientSearchHints.map((clientSearchHint) => ({
			label: clientSearchHint.clientBin,
			value: clientSearchHint.clientId,
		})),
	)
	const $currentClientHint = createStore<ClientSearchHint | null>(null)
	const $currentClientHintNameOption = $currentClientHint.map((currentClientHint) =>
		currentClientHint ? { label: currentClientHint.clientName, value: Number(currentClientHint.clientId) } : null,
	)
	const $currentClientHintBinOption = $currentClientHint.map((currentClientHint) =>
		currentClientHint ? { label: currentClientHint.clientBin, value: Number(currentClientHint.clientId) } : null,
	)
	const $clientSearchHintsPending = createStore<boolean>(false)

	const getClientSearchHintsByNameFx = attach({
		effect: clientApi.clientSearchHintsQuery,
		source: { districtId, clientName: $clientNameField },
		mapParams: (params: void, { districtId, clientName }) => {
			if (!districtId) throw new Error('districtId is null')
			if (clientName === '') throw new Error('clientName is empty')
			return { districtId, clientName }
		},
	})

	const getClientSearchHintsByBinFx = attach({
		effect: clientApi.clientSearchHintsQuery,
		source: { districtId, clientBin: $clientBinField },
		mapParams: (params: void, { districtId, clientBin }) => {
			if (!districtId) throw new Error('districtId is null')
			if (clientBin === '') throw new Error('clientBin is empty')
			return { districtId, clientBin: Number(clientBin) }
		},
	})

	$clientNameField.on(clientNameFieldChanged, (_, value) => value)
	$clientBinField.on(clientBinFieldChanged, (_, value) => value)

	$clientSearchType.on(clientSearchTypeChanged, (state) => (state === 'name' ? 'bin' : 'name'))

	debounce({
		source: $clientNameField as any,
		timeout: 500,
		target: getClientSearchHintsByNameFx,
	})

	debounce({
		source: $clientBinField as any,
		timeout: 500,
		target: getClientSearchHintsByBinFx,
	})

	$clientSearchHintsPending.on(
		[getClientSearchHintsByNameFx.pending, getClientSearchHintsByBinFx.pending],
		(state, pending) => pending,
	)
	$clientSearchHints.on(
		[getClientSearchHintsByNameFx.doneData, getClientSearchHintsByBinFx.doneData],
		(_, clientSearchHints) => clientSearchHints,
	)
	$clientSearchHints.reset(getClientSearchHintsByNameFx, getClientSearchHintsByBinFx, $clientSearchType)
	$clientNameField.reset($clientSearchType)
	$clientBinField.reset($clientSearchType)

	sample({
		clock: clientHintClicked,
		source: $clientSearchHints,
		fn: (clientSearchHints, clientId) =>
			clientSearchHints.find((clientSearchHint) => clientSearchHint.clientId === clientId) ?? null,
		target: $currentClientHint,
	})

	return {
		clientSearchTypeChanged,
		clientNameFieldChanged,
		clientBinFieldChanged,
		clientHintClicked,
		$clientSearchType,
		$clientNameField,
		$clientBinField,
		$clientSearchHints,
		$clientSearchNameOptions,
		$clientSearchBinOptions,
		$clientSearchHintsPending,
		$districtId: districtId,
		$currentClientHint,
		$currentClientHintNameOption,
		$currentClientHintBinOption,
	}
})
