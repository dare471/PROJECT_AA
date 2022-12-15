import { createApi, createStore, Store } from 'effector'
import { modelFactory } from 'effector-factorio'

export interface Option {
	label: string
	value: string
}

interface SelectFactoryOptions {
	$options: Store<Option[]>
}

export const selectFactory = modelFactory(function selectFactory(options: SelectFactoryOptions) {
	const $currentOptions = createStore<Option[]>([])
	const $currentOption = createStore<Option | null>(null)

	const { optionChanged, optionSet } = createApi($currentOption, {
		optionChanged: (_, selectedOption: Option) => selectedOption,
		optionSet: (_, option: Option) => option
	})

	const { optionsChanged, optionsSet } = createApi($currentOptions, {
		optionsChanged: (_, selectedOptions: Option[]) => selectedOptions,
		optionsSet: (_, options: Option[]) => options
	})

	$currentOptions.reset(options.$options)
	$currentOption.reset(options.$options)

	return {
		$options: options.$options,
		$currentOptions,
		$currentOption,
		optionChanged,
		optionsChanged,
		optionsSet,
		optionSet
	}
})
