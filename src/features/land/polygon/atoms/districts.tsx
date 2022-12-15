import { modelView } from 'effector-factorio'
import { useUnit } from 'effector-react'

import { CreateMap } from '~src/entities/map'

import { landFactory } from '../model'

export const DistrictsLandPolygon = modelView(landFactory, () => {
	const model = landFactory.useModel()
	const [districts, handleClick] = useUnit([model.$districts, model.districtClicked])

	if (!districts) return null

	return (
		<>
			{districts.map((district) => (
				<CreateMap.Polygon
					key={district.districtId}
					positions={district.geometry_rings as any}
					options={{ color: '#005077', fill: true, fillColor: '#005077', fillOpacity: 0.3 }}
					events={{
						click: () => {
							handleClick(district)
						}
					}}
				/>
			))}
		</>
	)
})
