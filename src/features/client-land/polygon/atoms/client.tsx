import { modelView } from 'effector-factorio'
import { useUnit } from 'effector-react'

import { CreateMap } from '~src/entities/map'

import { clientLandFactory } from '../model'

export const ClientLandPolygon = modelView(clientLandFactory, ({ model }) => {
	const clientLand = useUnit(model.$clientLand)

	if (!clientLand) return null

	return (
		<>
			{clientLand.linkPlot.map((plot) => {
				const resultGeometryRings = plot.geometry_rings[0].map((geometry) => [
					geometry[1],
					geometry[0]
				])
				return (
					<CreateMap.Polyline
						key={plot.plotId}
						positions={[resultGeometryRings] as any}
						options={{ color: 'white' }}
					/>
				)
			})}
		</>
	)
})
