import { modelView } from 'effector-factorio'
import { useUnit } from 'effector-react'
import React from 'react'

import { CreateMap } from '~src/entities/map'

import { clientLandFactory } from '../model'

export const ClientLandPlotCulturesPolygon = modelView(clientLandFactory, ({ model }) => {
	const [clientsLandPlotsCultures, handleClick] = useUnit([
		model.$clientsLandPlotsCultures,
		model.clientLandClicked
	])

	if (!clientsLandPlotsCultures) return null

	return (
		<>
			{clientsLandPlotsCultures.map((clientLand) => {
				if (clientLand.linkPlot.length > 2) return null
				const resultGeometryRings = clientLand.linkPlot[0].map((geometry) => [
					geometry[1],
					geometry[0]
				])

				return (
					<CreateMap.Polygon
						key={clientLand.plotid}
						positions={[resultGeometryRings] as any}
						options={{ color: 'red' }}
						events={{
							click: () => {
								handleClick({ id: clientLand.clientId })
							}
						}}
					/>
				)
			})}
		</>
	)
})
