import { createEvent, createStore } from 'effector'

interface CreateModalOptions<T> {
	defaultModalsState: T
}

export function createModals<T extends Record<string, boolean>>(options: CreateModalOptions<T>) {
	const { defaultModalsState } = options

	const modalOpenClicked = createEvent<{ modalName: keyof T }>()
	const modalCloseClicked = createEvent<{ modalName: keyof T }>()

	const $modalsState = createStore<Record<keyof T, boolean>>(defaultModalsState)

	$modalsState.on(modalOpenClicked, (state, { modalName }) => ({
		...state,
		[modalName]: state.modalName ? !state.modalName : true,
	}))

	$modalsState.on(modalCloseClicked, (state, { modalName }) => ({
		...state,
		[modalName]: state.modalName ? !state.modalName : false,
	}))

	return { $modalsState, modalOpenClicked, modalCloseClicked }
}
