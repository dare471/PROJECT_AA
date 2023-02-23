import { useUnit } from 'effector-react'
import { default as ReactSelect, type Props as ReactSelectProps } from 'react-select'

import { type createSelect, type MultiSelectReturn, type SingleSelectReturn } from './model'

interface SelectProps extends ReactSelectProps {
	model: ReturnType<typeof createSelect>
}

export { ReactSelectProps }

export function Select(props: SelectProps) {
	const { model, onChange, ...otherProps } = props

	if (model.__isMulti === true) {
		const newModel = model as unknown as MultiSelectReturn
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [options, selectOptions, handleSelectOption] = useUnit([
			newModel.$defaultOptions,
			newModel.$selectOptions,
			newModel.optionChanged,
		])

		return (
			<ReactSelect
				{...otherProps}
				isMulti
				isDisabled={options.length === 0}
				options={options}
				value={selectOptions}
				onChange={(newValue, actionMeta) =>
					onChange
						? onChange(newValue, actionMeta)
						: handleSelectOption({ action: actionMeta.action as any, option: actionMeta.option as any })
				}
			/>
		)
	} else {
		const newModel = model as unknown as SingleSelectReturn
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [options, selectOption, handleSelectOption] = useUnit([
			newModel.$defaultOptions,
			newModel.$selectOption!,
			newModel.optionChanged,
		])

		return (
			<ReactSelect
				{...otherProps}
				isMulti={false}
				isDisabled={options.length === 0}
				options={options}
				value={selectOption}
				onChange={(newValue, actionMeta) =>
					onChange
						? onChange(newValue, actionMeta)
						: handleSelectOption({ action: actionMeta.action as any, option: newValue as any })
				}
			/>
		)
	}
}
