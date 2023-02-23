import { createEvent, sample } from 'effector'

import { createUser, createUserMapHistories } from '~src/entities/user'

export const userPublicProfilePageMounted = createEvent<{ userId: number }>()
export const userPublicProfilePageUnmounted = createEvent<void>()

export const $$user = createUser()
export const $$userMapHistories = createUserMapHistories()

sample({
	clock: userPublicProfilePageMounted,
	target: [$$user.getUserFx, $$userMapHistories.getUserMapHistoriesFx],
})
