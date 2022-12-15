import { modelView } from 'effector-factorio'
import { useUnit } from 'effector-react'
import { TbElevator } from 'react-icons/all'

import { Toggle } from '~src/shared/ui'

import { elevatorsFactory } from '../model'

export const ElevatorsToggle = modelView(elevatorsFactory, ({ model }) => {
	const [selected, handleClick] = useUnit([model.$hasElevators, model.elevatorsToggled])

	return (
		<Toggle selected={selected} onSelect={() => handleClick()}>
			<TbElevator fontSize={18} />
		</Toggle>
	)
})
