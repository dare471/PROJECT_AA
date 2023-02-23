import { useStore } from 'effector-react'

import { MapRoutingFactory } from '~src/entities/map-routing'

import { type createClientOffice } from './model'

interface ClientOfficeProps {
	model: ReturnType<typeof createClientOffice>
}

export function ClientOffice(props: ClientOfficeProps) {
	const { model } = props
	const clientOffice = useStore(model.$clientOffice)

	if (!clientOffice) return null

	return <MapRoutingFactory.MapRouting model={model.clientOfficeMapRoutingModel} />
}
