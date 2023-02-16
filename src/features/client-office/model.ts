import { attach, createStore } from 'effector'

import { clientApi, type ClientOffice } from '~src/shared/api'

export function createClientOffice() {
	const $clientOffice = createStore<ClientOffice | null>(null)
	const $clientOfficePending = createStore<boolean>(false)

	const getClientOfficeFx = attach({
		effect: clientApi.clientOfficeQuery,
	})

	$clientOfficePending.on(getClientOfficeFx.pending, (state, pending) => pending)
	$clientOffice.on(getClientOfficeFx.doneData, (state, clientOffice) => clientOffice)

	return { getClientOfficeFx, $clientOffice, $clientOfficePending }
}
