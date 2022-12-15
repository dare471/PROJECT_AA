import { useUnit } from 'effector-react'

import { Input } from '~src/shared/ui'

import * as model from '../model'

export const XInput = () => {
	const [xField, handleChange] = useUnit([model.$xField, model.xFieldChanged])

	return (
		<Input
			placeholder='Enter x position'
			value={xField ?? ''}
			onChange={(e) => handleChange(e.target.value)}
		/>
	)
}
