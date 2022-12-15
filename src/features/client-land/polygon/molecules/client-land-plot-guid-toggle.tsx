import { modelView } from 'effector-factorio'
import { useUnit } from 'effector-react'
import { ImListNumbered } from 'react-icons/all'

import { Toggle } from '~src/shared/ui'

import { clientLandFactory } from '../model'

export const ClientLandPlotGuidToggle = modelView(clientLandFactory, ({ model }) => {
	const [checked, handleToggle] = useUnit([
		model.$isClientLandPlotGuid,
		model.clientLandPlotGuidToggled
	])

	return (
		<Toggle selected={checked} onSelect={() => handleToggle()}>
			<ImListNumbered />
		</Toggle>
	)
})
