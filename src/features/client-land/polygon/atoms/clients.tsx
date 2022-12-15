import { modelView } from 'effector-factorio'
import { useStore, useUnit } from 'effector-react'
import React from 'react'

import { clientLandFactory } from '~src/features/client-land/polygon/model'

import { CreateMap } from '~src/entities/map'

export const ClientsLandPolygon = modelView(clientLandFactory, () => {
	const model = clientLandFactory.useModel()
	const [clientsLand, handleClick] = useUnit([model.$clientsLand, model.clientLandClicked])
	const isGuid = useStore(model.$isClientLandPlotGuid)

	if (!clientsLand) return null

	return (
		<>
			{clientsLand.map((clientLand) => (
				<React.Fragment key={clientLand.clientId}>
					{clientLand.linkPlot && (
						<>
							{clientLand.linkPlot.map((plot) => {
								if (plot.geometry_rings.length > 2) return null
								const resultGeometryRings = plot.geometry_rings[0].map((geometry) => [
									geometry[1],
									geometry[0]
								])
								return (
									<CreateMap.Polygon
										key={plot.plotId}
										positions={[resultGeometryRings] as any}
										options={{
											color: !isGuid ? 'blue' : clientLand.guid === 1 ? 'lightgreen' : '#FAAA8C'
										}}
										events={{
											click: () => {
												handleClick({ id: clientLand.clientId })
											}
										}}
									/>
								)
							})}
						</>
					)}
				</React.Fragment>
			))}
		</>
	)
})
