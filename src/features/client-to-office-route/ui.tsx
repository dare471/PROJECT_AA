import { useStore } from 'effector-react'

import { MapRoutingFactory } from '~src/entities/map-routing'

import { type createClientToOfficeRoute } from './model'

interface ClientToOfficeRouteProps {
	model: ReturnType<typeof createClientToOfficeRoute>
}

export function ClientToOfficeRoute(props: ClientToOfficeRouteProps) {
	const { model } = props
	const clientToOfficeRoute = useStore(model.$clientToOfficeRoute)

	if (!clientToOfficeRoute) return null

	return <MapRoutingFactory.MapRouting model={model.$$clientOfficeMapRouting} />
}
