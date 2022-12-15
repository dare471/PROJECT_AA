import { modelView } from 'effector-factorio'
import { useUnit } from 'effector-react'

import { CreateMap } from '~src/entities/map'

import { clientLandFactory } from '../model'

export const ClientLandPlot = modelView(clientLandFactory, ({ model }) => {
	const [clientLandPlot] = useUnit([model.$clientLandPlot])

	if (!clientLandPlot) return null
	if (clientLandPlot.geometry_rings.length > 2) return null
	const resultGeometryRings = clientLandPlot.geometry_rings[0].map((geometry) => [
		geometry[1],
		geometry[0]
	])

	return (
		<CreateMap.Polyline
			key={clientLandPlot.plotId}
			positions={resultGeometryRings as any}
			options={{
				color: 'white'
			}}
		/>
	)
})
