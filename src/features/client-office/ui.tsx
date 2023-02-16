import { useUnit } from 'effector-react'
import L from 'leaflet'

import { Routing } from '~src/entities/leaflet-routing'

import { type createClientOffice } from './model'

interface ClientOfficeProps {
	model: ReturnType<typeof createClientOffice>
}

export function ClientOffice(props: ClientOfficeProps) {
	const { model } = props
	const [clientOffice] = useUnit([model.$clientOffice])
	const icon = L.icon({
		iconUrl: 'https://cdn-icons-png.flaticon.com/512/7987/7987463.png',
		iconSize: [35, 35],
	})

	if (!clientOffice) return null

	return (
		<Routing
			wayPoints={[L.latLng(clientOffice.officeCoordinate), L.latLng(clientOffice.clientCoordinate)]}
			options={{
				addWaypoints: false,
				plan: L.Routing.plan([L.latLng(clientOffice.officeCoordinate), L.latLng(clientOffice.clientCoordinate)], {
					createMarker: (waypointIndex: number, waypoint: any, numberOfWaypoints: number) =>
						L.marker(waypoint.latLng, { icon }),
				}),
			}}
		/>
	)
}
