import { createEvent, createStore, type Event, type Store } from 'effector'

export interface Option {
	value: string | number
	label: string
}

type SelectReturn = {
	optionChanged: Event<{ action: 'select-option' | 'remove-value' | 'clear'; option: Option }>
	optionSelected: Event<Option>
	optionRemoved: Event<Option>
	optionCleared: Event<null>
	$defaultOptions: Store<Option[]>
	__isMulti: boolean
}
export type MultiSelectReturn = { $selectOptions: Store<Option[]> } & SelectReturn
export type SingleSelectReturn = { $selectOption: Store<Option | null> } & SelectReturn

export function createSelect<T extends true>(options: {
	defaultOptions: Store<Option[]>
	isMulti: T
}): MultiSelectReturn
export function createSelect<T extends false>(options: {
	defaultOptions: Store<Option[]>
	isMulti: T
}): SingleSelectReturn
export function createSelect<T extends boolean>(options: {
	defaultOptions: Store<Option[]>
	isMulti: T
}): MultiSelectReturn | SingleSelectReturn {
	const { defaultOptions: $defaultOptions, isMulti } = options
	const optionChanged = createEvent<{ action: 'select-option' | 'remove-value' | 'clear'; option: Option }>()
	const optionCleared = optionChanged.filterMap(({ action }) => (action === 'clear' ? null : undefined))
	const optionSelected = optionChanged.filterMap(({ action, option }) =>
		action === 'select-option' ? option : undefined,
	)
	const optionRemoved = optionChanged.filterMap(({ action, option }) =>
		action === 'remove-value' ? option : undefined,
	)

	if (isMultiGuard(isMulti)) {
		const $selectOptions = createStore<Option[]>([])

		$selectOptions.on(optionSelected, (state, option) => [...state, option])
		$selectOptions.on(optionRemoved, (state, option) => state.filter((o) => o.value !== option.value))
		$selectOptions.on(optionCleared, () => [])

		return {
			optionChanged,
			optionSelected,
			optionRemoved,
			optionCleared,
			$defaultOptions,
			$selectOptions,
			__isMulti: isMulti,
		}
	} else {
		const $selectOption = createStore<Option | null>(null)

		$selectOption.on(optionSelected, (_, option) => option)
		$selectOption.on(optionCleared, () => null)
		$selectOption.on(optionRemoved, () => null)

		return {
			optionChanged,
			optionSelected,
			optionRemoved,
			optionCleared,
			$defaultOptions,
			$selectOption,
			__isMulti: isMulti,
		}
	}
}

export function isMultiGuard(isMulti: boolean): isMulti is true {
	return isMulti === true
}
