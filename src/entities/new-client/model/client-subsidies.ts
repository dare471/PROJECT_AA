import { attach, createStore } from 'effector'
import { reset, status } from 'patronum'

import { clientApi, type ClientSubsidy } from '~src/shared/api'

export function createClientSubsidies() {
	const getClientSubsidiesFx = attach({
		effect: clientApi.clientSubsidiesQuery,
	})

	const $clientSubsidies = createStore<ClientSubsidy[]>([])
	const $clientSubsidiesStatus = status({ effect: getClientSubsidiesFx })

	$clientSubsidies.on(getClientSubsidiesFx.doneData, (_, clientSubsidies) => clientSubsidies)
	const resetClientSubsidies = reset({ target: [$clientSubsidies] })

	return {
		getClientSubsidiesFx,
		resetClientSubsidies,
		$clientSubsidies,
		$clientSubsidiesStatus,
	}
}
