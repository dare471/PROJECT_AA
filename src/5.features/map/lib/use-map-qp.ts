import { StringParam, useQueryParam } from 'use-query-params'

import { TPolygonType } from '@/7.shared/api'

export const useMapQP = () => {
	const [illustrate] = useQueryParam<TPolygonType>('illustrate')
	const [regionQP, setRegionQP] = useQueryParam('region', StringParam)
	const [districtQP, setDistrictQP] = useQueryParam('district', StringParam)
	const [clientPolygonsQP, setClientPolygonsQP] = useQueryParam('clientPolygons', StringParam)
	const [clientPolygonQP, setClientPolygonQP] = useQueryParam('clientPolygon', StringParam)
	const illustrateDataQP =
		illustrate === 'region'
			? regionQP
			: illustrate === 'district'
			? districtQP
			: illustrate === 'clientPolygons'
			? clientPolygonsQP
			: illustrate === 'clientPolygon'
			? clientPolygonQP
			: null

	return {
		regionQP,
		setRegionQP,
		districtQP,
		setDistrictQP,
		clientPolygonsQP,
		setClientPolygonsQP,
		clientPolygonQP,
		setClientPolygonQP,
		illustrateDataQP
	} as const
}
