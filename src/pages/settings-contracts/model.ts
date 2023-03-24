import { createEvent, sample } from 'effector'

import { $$session } from '~src/entities/session'
import { createUserContracts } from '~src/entities/user'

import { type Session } from '~src/shared/api'
import { TableFactory } from '~src/shared/ui'

export const settingsContractsPageMounted = createEvent<void>()
export const settingsContractsPageUnmounted = createEvent<void>()

export const $$userContracts = createUserContracts()
export const $$userContractsTable = TableFactory.createTable({
	data: $$userContracts.$userContracts,
	tableGenerateCb: () => ({}),
})

sample({
	clock: settingsContractsPageMounted,
	source: $$session.$session,
	filter: (session: Session | null): session is Session => session !== null,
	fn: (session) => ({ userId: session.id }),
	target: $$userContracts.getUserContractsFx,
})
