import { useUnit } from 'effector-react'

import { Input } from '~src/shared/ui'

import * as model from '../model'

export const YInput = () => {
	const [yField, handleChange] = useUnit([model.$yField, model.yFieldChanged])

	return (
		<Input
			placeholder='Enter y position'
			value={yField ?? ''}
			onChange={(e) => handleChange(e.target.value)}
		/>
	)
}
