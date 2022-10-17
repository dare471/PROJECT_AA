import { StringParam, useQueryParam } from 'use-query-params'
import { TIllustrate } from '@/3.pages'

export const useMapQP = () => {
	const [illustrate] = useQueryParam<TIllustrate>('illustrate')
	const [regionQP, setRegionQP] = useQueryParam('region', StringParam)
	const [districtQP, setDistrictQP] = useQueryParam('district', StringParam)
	const [clientQP, setClientQP] = useQueryParam('client', StringParam)
	const [clientPolygonQP, setClientPolygonQP] = useQueryParam('clientPolygon', StringParam)
	const illustrateDataQP =
		illustrate === 'region'
			? regionQP
			: illustrate === 'district'
			? districtQP
			: illustrate === 'client'
			? clientQP
			: illustrate === 'clientPolygon'
			? clientPolygonQP
			: null

	return {
		regionQP,
		setRegionQP,
		districtQP,
		setDistrictQP,
		clientQP,
		setClientQP,
		clientPolygonQP,
		setClientPolygonQP,
		illustrateDataQP
	} as const
}
