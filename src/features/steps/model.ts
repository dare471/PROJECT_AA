import { createEvent, createStore, sample } from 'effector'

export function createSteps<T extends string>(options: { defaultSteps: T[]; defaultStep: T }) {
	const setStepNext = createEvent<void>()
	const setStepPrev = createEvent<void>()
	const setStep = createEvent<T>()

	const $steps = createStore<T[]>(options.defaultSteps)
	const $currentStep = createStore<T>(options.defaultStep)

	sample({
		clock: setStepNext,
		source: { steps: $steps, currentStep: $currentStep },
		fn: ({ steps, currentStep }) => {
			const currentIndex = steps.findIndex((step) => step === currentStep)

			if (currentIndex !== -1 && currentIndex !== steps.length - 1) {
				return steps[currentIndex + 1]!
			}

			return steps[0]!
		},
		target: $currentStep,
	})

	sample({
		clock: setStepPrev,
		source: { steps: $steps, currentStep: $currentStep },
		fn: ({ steps, currentStep }) => {
			const currentIndex = steps.findIndex((step) => step === currentStep)

			if (currentIndex !== -1 && currentIndex !== 0) {
				console.log(currentIndex)

				return steps[currentIndex - 1]!
			}

			return steps[0]!
		},
		target: $currentStep,
	})

	$currentStep.on(setStep, (step, newStep) => newStep)

	return {
		setStepNext,
		setStepPrev,
		$steps,
		$currentStep,
	}
}
