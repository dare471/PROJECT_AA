import { getNormalGeometries } from '~src/shared/api/adapters'

import type { District } from '../types.api'
import type { _District } from './types.adapter'

export class DistrictAdapter {
	public static fromApiToDistricts(data: _District[]): District[] {
		return data.map((item) => ({
			...item,
			type: 'district',
			id: Number(item.id),
			geometryRings: getNormalGeometries(item.geometry_rings),
		}))
	}
}
