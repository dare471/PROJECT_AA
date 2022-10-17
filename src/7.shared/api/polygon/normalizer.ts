import { CRS, Point } from 'leaflet'

// export const polygonNormalizer = (geometry: any) => {
// 	return geometry.map((item: any) => [item[0], item[1]])
// }

export const GeometryJsonNormalizer = (items: any) => {
	return items.map((item: any) => ({
		...item,
		GEOMETRY_RINGS: JSON.parse(item.GEOMETRY_RINGS)
	}))
}

export const GeometryNormalizer3857 = (items: any) => {
	const proj = CRS.EPSG3857

	return items.map((item: any) => {
		if (item.GEOMETRY_RINGS) {
			const newGEOMETRY_RINGS = item.GEOMETRY_RINGS[0].map((item: any) => {
				const newCoordinate = proj.unproject(new Point(item[0], item[1]))
				return [newCoordinate.lat, newCoordinate.lng]
			})

			return {
				...item,
				GEOMETRY_RINGS: [newGEOMETRY_RINGS]
			}
		}

		return item
	})
}
