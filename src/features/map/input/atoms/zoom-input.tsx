import { useUnit } from 'effector-react'

import { Input } from '~src/shared/ui'

import * as model from '../model'

export const ZoomInput = () => {
	const [zoomField, handleChange] = useUnit([model.$zoomField, model.zoomFieldChanged])

	return (
		<Input
			placeholder='Enter zoom position'
			value={zoomField ?? ''}
			onChange={(e) => handleChange(e.target.value)}
		/>
	)
}
