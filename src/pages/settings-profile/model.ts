import { createEvent, sample } from 'effector'

import { $$session } from '~src/entities/session'
import { createUserContracts, createUserMapHistories, UserFactory } from '~src/entities/user'

import { type Session } from '~src/shared/api'
import { createTabs } from '~src/shared/ui'

export const $settingsProfilePageMounted = createEvent<void>()
export const $settingsProfilePageUnmounted = createEvent<void>()

export const $$tabs = createTabs({
	defaultTab: 'settings',
	tabs: ['settings', 'contracts'],
})

export const $$user = UserFactory.createUser()
export const $$userMapHistories = createUserMapHistories()
export const $$userContracts = createUserContracts()

sample({
	clock: $settingsProfilePageMounted,
	source: $$session.$session,
	filter: (session: Session | null): session is Session => session !== null,
	fn: (session) => ({ userId: session.id }),
	target: [$$user.getUserFx, $$userMapHistories.getUserMapHistoriesFx],
})

sample({
	clock: $settingsProfilePageUnmounted,
	target: [$$user.$user.reinit!, $$userMapHistories.$userMapHistories.reinit!],
})
