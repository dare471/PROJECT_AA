import { CRS, Point } from 'leaflet'

import { District, Region } from './types'

export interface _Region {
	id: string
	type: 'region'
	name: string
	population_area: string
	geometry_rings: number[][][]
}

export interface _District {
	id: string
	type: 'district'
	name: string
	klkod: string
	vnaim: string
	geometry_rings: number[][][]
}

export function regionsAdapter(res: _Region[]): Region[] {
	const newData: Region[] = res.map((region) => ({
		type: region.type,
		regionId: Number(region.id),
		name: region.name,
		population_area: Number(region.population_area),
		geometry_rings: getGeometriesNormalize(region.geometry_rings)
	}))

	return newData
}

export function districtsAdapter(res: _District[]): District[] {
	const newData: District[] = res.map((district) => ({
		type: district.type,
		districtId: Number(district.id),
		name: district.name,
		klkod: Number(district.klkod),
		geometry_rings: getGeometriesNormalize(district.geometry_rings)
	}))

	return newData
}

function getGeometriesNormalize(geometries: number[][][]): number[][][] {
	try {
		const proj = CRS.EPSG3857

		if (geometries) {
			const newGeometries = geometries[0].map((geometry: any) => {
				const newGeometry = proj.unproject(new Point(geometry[0], geometry[1]))
				return [newGeometry.lat, newGeometry.lng]
			})

			return [newGeometries]
		}

		return geometries
	} catch (err) {
		throw err
	}
}
