import { createEvent, createStore, sample } from 'effector'

import { landModel } from '~src/entities/land'

export const mapPageMounted = createEvent<void>()
export const clickedSidebarButton = createEvent<void>()

export const $sidebarIsActive = createStore<boolean>(false)

sample({
	clock: mapPageMounted,
	target: landModel.getRegions
})

$sidebarIsActive.on(clickedSidebarButton, (prev) => !prev)
