import { getNormalGeometries } from '../../adapters'
import type { Region } from './types'

interface _RegionLand {
	id: string
	type: 'region' | 'regionBilling'
	name: string
	population_area: string
	geometry_rings: number[][][]
}

export function regionsAdapter(regions: _RegionLand[]): Region[] {
	return regions.map((region) => ({
		type: 'region',
		id: Number(region.id),
		name: region.name,
		populationArea: Number(region.population_area),
		geometryRings: getNormalGeometries(region.geometry_rings),
	}))
}
