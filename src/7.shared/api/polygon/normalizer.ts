import { CRS, Point } from 'leaflet'

import { TPolygon } from './types'

/**
 *
 * @param data
 * @returns Normalize geometry_rings: string(number[][][]) to number[][][]
 */
export const getGeometryJsonNormalizer = <T extends TPolygon>(data: T[]): T[] => {
	return data.map(item => {
		try {
			if (item.geometry_rings) {
				const geometry_rings_str = item.geometry_rings as unknown as string
				const newGeometryRings = JSON.parse(geometry_rings_str ? geometry_rings_str : '')
				return {
					...item,
					geometry_rings: newGeometryRings
				}
			}
			return item
		} catch (err) {
			console.log(`JSON Parse Error ${err}`)
			throw err
		}
	})
}

/**
 *
 * @param data
 * @returns Normalize EPSG3857 to Standarts
 */
export const getGeometryNormalizer3857 = <T extends TPolygon>(data: T[]): T[] => {
	const proj = CRS.EPSG3857

	return data.map((item: T) => {
		if (item.geometry_rings) {
			const newGeometryRings = item.geometry_rings[0].map((item: any) => {
				const newCoordinate = proj.unproject(new Point(item[0], item[1]))
				return [newCoordinate.lat, newCoordinate.lng]
			})

			return {
				...item,
				geometry_rings: [newGeometryRings]
			}
		}

		return item
	})
}
