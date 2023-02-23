import { getNormalGeometries } from '../../adapters'
import type { District } from './types'

interface _District {
	id: string
	name: string
	klkod: string
	vnaim: string
	geometry_rings: number[][][]
}

export function districtsAdapter(districts: _District[]): District[] {
	return districts.map((district) => ({
		...district,
		type: 'district',
		id: Number(district.id),
		geometryRings: getNormalGeometries(district.geometry_rings),
	}))
}
