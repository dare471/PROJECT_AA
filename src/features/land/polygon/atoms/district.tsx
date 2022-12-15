import { modelView } from 'effector-factorio'
import { useStore } from 'effector-react'

import { landFactory } from '~src/features/land/polygon/model'

import { CreateMap } from '~src/entities/map'

export const DistrictLandPolygon = modelView(landFactory, () => {
	const model = landFactory.useModel()
	const district = useStore(model.$district)

	if (!district) return null

	return (
		<CreateMap.Polyline
			key={district.districtId}
			positions={district.geometry_rings as any}
			options={{ color: 'white' }}
		/>
	)
})
