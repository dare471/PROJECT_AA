import { createEvent, createStore } from 'effector'
import { modelFactory } from 'effector-factorio'

interface ModalFactoryOptions {
	open: boolean
}

export const modalFactory = modelFactory(function modalFactory(options: ModalFactoryOptions) {
	const openClicked = createEvent<void>()
	const closeClicked = createEvent<void>()

	const $open = createStore<boolean>(options.open)

	$open.on(openClicked, () => true)
	$open.on(closeClicked, () => false)

	return {
		$open,
		openClicked,
		closeClicked
	}
})
