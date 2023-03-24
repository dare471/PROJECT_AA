import { createEvent, createStore, sample } from 'effector'

import { UserFactory } from '~src/entities/user'

export const profilePageMounted = createEvent<{ userId: number }>()
export const profilePageUnmounted = createEvent<void>()

export const $userId = createStore<number | null>(null)

export const $$user = UserFactory.createUser()

$userId.on(profilePageMounted, (_, { userId }) => userId)

sample({
	clock: $userId,
	filter: (userId: number | null): userId is number => userId !== null,
	fn: (userId) => ({ userId }),
	target: $$user.getUserFx,
})
