import { getNormalGeometries } from '~src/shared/api/adapters'

import type { Region } from '../types'
import type { _RegionLand } from './types.adapter'

export class RegionAdapter {
	public static fromApiToRegions(data: _RegionLand[]): Region[] {
		return data.map((item) => ({
			type: 'region',
			id: Number(item.id),
			name: item.name,
			populationArea: Number(item.population_area),
			geometryRings: getNormalGeometries(item.geometry_rings),
		}))
	}
}
