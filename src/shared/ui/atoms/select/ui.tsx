import { Model, modelView } from 'effector-factorio'
import { useStore, useUnit } from 'effector-react'
import type { Props as ReactSelectProps } from 'react-select'
import ReactSelect from 'react-select'
import styled from 'styled-components'

import { type Option, selectFactory } from './model'

interface Props extends ReactSelectProps {
	model: Model<typeof selectFactory>
	className?: string
}

export const Select = modelView(selectFactory, ({ model, ...props }: Props) => {
	const options = useStore(model.$options)

	if (!props.isMulti) {
		const [currentOption, handleChange] = useUnit([model.$currentOption, model.optionChanged])

		return (
			<StyledSelect
				options={options}
				value={currentOption}
				onChange={(newValue, actionMeta) => handleChange(newValue as Option)}
				{...props}
			/>
		)
	} else {
		const [currentOptions, handleChange] = useUnit([model.$currentOptions, model.optionsChanged])

		return (
			<StyledSelect
				options={options}
				value={currentOptions}
				onChange={(newValue, actionMeta) => handleChange(newValue as Option[])}
				{...props}
			/>
		)
	}
})

const StyledSelect = styled(ReactSelect)`
	font-size: 0.9rem;
`
