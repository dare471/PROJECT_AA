import { createEvent, sample } from 'effector'

import { landsModel } from '~src/entities/lands'

export const mapPageMounted = createEvent<void>()

sample({
	clock: mapPageMounted,
	target: landsModel.getRegions
})
