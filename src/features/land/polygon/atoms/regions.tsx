import { modelView } from 'effector-factorio'
import { useUnit } from 'effector-react'

import { CreateMap } from '~src/entities/map'

import { landFactory } from '../model'

export const RegionsLandPolygon = modelView(landFactory, () => {
	const model = landFactory.useModel()
	const [regions, handleClick] = useUnit([model.$regions, model.regionClicked])

	if (!regions) return null

	return (
		<>
			{regions.map((region) => (
				<CreateMap.Polygon
					key={region.regionId}
					positions={region.geometry_rings as any}
					options={{ color: '#006496', fill: true, fillColor: '#0078B4', fillOpacity: 0.3 }}
					events={{
						click: () => {
							handleClick(region)
						}
					}}
				/>
			))}
		</>
	)
})
