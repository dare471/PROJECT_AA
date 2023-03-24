import { createEvent, createStore, sample } from 'effector'
import { interval } from 'patronum'

export function createTimer(options: { timeout: number }) {
	const timerStarted = createEvent<void>()
	const timerStopped = createEvent<void>()
	const reset = createEvent<void>()

	const $timer = createStore<number>(0)

	const { tick, isRunning: $isRunning } = interval({
		start: timerStarted,
		timeout: options.timeout,
		stop: timerStopped,
	})

	$timer.on(tick, (timer) => timer + 1)

	sample({
		clock: reset,
		target: [$timer.reinit!, timerStopped],
	})

	return { timerStarted, timerStopped, reset, $timer, $isRunning }
}
