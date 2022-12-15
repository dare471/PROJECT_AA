import { modelView } from 'effector-factorio'
import { useStore } from 'effector-react'

import { CreateMap } from '~src/entities/map'

import { landFactory } from '../model'

export const RegionLandPolygon = modelView(landFactory, () => {
	const model = landFactory.useModel()
	const region = useStore(model.$region)

	if (!region) return null

	return (
		<CreateMap.Polyline
			key={region.regionId}
			positions={region.geometry_rings as any}
			options={{ color: 'white' }}
		/>
	)
})
