import { modelView } from 'effector-factorio'
import { useUnit } from 'effector-react'
import { Fragment } from 'react'

import { CreateMap } from '~src/entities/map'

import { clientLandFactory } from '../model'

export const ClientLandPlots = modelView(clientLandFactory, ({ model }) => {
	const [clientLandPlots, handleClick] = useUnit([
		model.$clientLandPlots,
		model.clientLandPlotClicked
	])

	if (!clientLandPlots) return null

	return (
		<>
			{clientLandPlots.map((clientLandPlot) => (
				<Fragment key={clientLandPlot.clientId}>
					{clientLandPlot.linkPlot.map((plot) => {
						if (plot.geometry_rings.length > 2) return null
						const resultGeometryRings = plot.geometry_rings[0].map((geometry) => [
							geometry[1],
							geometry[0]
						])

						return (
							<CreateMap.Polygon
								key={plot.plotId}
								positions={resultGeometryRings as any}
								options={{ color: 'black' }}
								events={{
									click: () => {
										handleClick({ id: plot.plotId })
									}
								}}
							/>
						)
					})}
				</Fragment>
			))}
		</>
	)
})
