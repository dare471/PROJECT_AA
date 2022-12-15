import { attach, createEvent, createStore, sample, split } from 'effector'
import { modelFactory } from 'effector-factorio'

import { Elevator, elevatorApi } from '~src/shared/api'

interface ElevatorsFactoryOptions {}

export const elevatorsFactory = modelFactory(function elevatorFactory(
	options: ElevatorsFactoryOptions
) {
	const elevatorsToggled = createEvent<void>()
	const getElevators = createEvent<void>()
	const resetElevators = createEvent<void>()

	const getElevatorsFx = attach({ effect: elevatorApi.getElevatorsQuery })

	const $elevators = createStore<Elevator[] | null>(null)
	const $hasElevators = $elevators.map((elevators) => Boolean(elevators))

	split({
		clock: elevatorsToggled,
		source: $hasElevators,
		match: {
			set: (isChecked) => !isChecked,
			unSet: (isChecked) => isChecked
		},
		cases: {
			set: getElevators,
			unSet: resetElevators
		}
	})

	sample({
		clock: elevatorsToggled,
		source: $hasElevators
	})

	sample({
		clock: getElevators,
		target: getElevatorsFx
	})

	$elevators.on(getElevatorsFx.doneData, (_, elevators) => elevators)
	$elevators.reset(resetElevators)

	return {
		$elevators,
		$hasElevators,
		getElevators,
		getElevatorsFx,
		elevatorsToggled
	}
})
