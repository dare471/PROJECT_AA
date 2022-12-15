import { useUnit } from 'effector-react'
import React from 'react'
import { BsBoundingBoxCircles } from 'react-icons/bs'

import { Toggle } from '~src/shared/ui'

import * as model from './model'

export const BoundToggle = () => {
	const [isBoundsChecked, handleClicked] = useUnit([model.$isBoundsChecked, model.boundsClicked])

	return (
		<Toggle selected={isBoundsChecked} onSelect={() => handleClicked()}>
			<BsBoundingBoxCircles />
		</Toggle>
	)
}
