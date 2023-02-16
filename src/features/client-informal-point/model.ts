import { attach, createEvent, createStore } from 'effector'
import { modelFactory } from 'effector-factorio'

import { clientApi, type ClientInformalPointRef } from '~src/shared/api'

type CreateClientInformalMeetingPointOptions = {
	isMulti?: boolean
}

export const createClientInformalPoint = modelFactory(function createClientInformalMeetingPoint(
	options: CreateClientInformalMeetingPointOptions,
) {
	const { isMulti = false } = options

	const markerSettled = createEvent<[number, number]>()
	const descriptionChanged = createEvent<string>()
	const refSelected = createEvent<number>()

	const $refs = createStore<ClientInformalPointRef[]>([])
	const $refsPending = createStore<boolean>(false)

	const $markers = createStore<[number, number][]>([])
	const $marker = createStore<[number, number] | null>(null)

	const $description = createStore<string>('')
	const $selectRef = createStore<number | null>(null)

	const getRefsFx = attach({
		effect: clientApi.clientInformalPointRefsQuery,
	})

	$refsPending.on(getRefsFx.pending, (state, pending) => pending)
	$refs.on(getRefsFx.doneData, (state, refs) => refs)

	if (isMulti) {
		$markers.on(markerSettled, (state, marker) => [...state, marker])
	} else {
		$marker.on(markerSettled, (state, marker) => marker)
	}

	$selectRef.on(refSelected, (state, ref) => ref)
	$description.on(descriptionChanged, (state, description) => description)

	return {
		markerSettled,
		descriptionChanged,
		refSelected,
		getRefsFx,
		$refs,
		$refsPending,
		$markers,
		$marker,
		$description,
		$selectRef,
		isMulti,
	}
})
