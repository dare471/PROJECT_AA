import L from 'leaflet'
import React from 'react'
import { useMap } from 'react-leaflet'

export function Routing(props: {
	wayPoints: L.LatLng[]
	options?: Omit<L.Routing.RoutingControlOptions, 'wayPoints'>
}) {
	const map = useMap()

	React.useEffect(() => {
		const routing = L.Routing.control({ waypoints: props.wayPoints, ...props.options })

		routing.addTo(map)
		return () => {
			routing.remove()
		}
	}, [props])

	return null
}
