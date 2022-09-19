import { CRS, Point } from 'leaflet'

export const polygonNormalizer = (items: any) => {
	return items.GEOMETRY_RINGS
		? items.GEOMETRY_RINGS[0].map((item: any) => [item[0], item[1]])
		: items.geometry_rings[0].map((item: any) => [item[0], item[1]])
}

export const JsonNormalizer = (res: any) => {
	return res.map((item: any) => ({
		...item,
		GEOMETRY_RINGS: JSON.parse(item.GEOMETRY_RINGS ? item.GEOMETRY_RINGS : item.geometry_rings)
	}))
}

export const Normalizer3857 = (res: any) => {
	const proj = CRS.EPSG3857
	return res.map((item: any) => {
		if (item?.GEOMETRY_RINGS) {
			const newGEOMETRY_RINGS = item.GEOMETRY_RINGS
				? item.GEOMETRY_RINGS[0].map((item: any) => {
						const newCoordinate = proj.unproject(new Point(item[0], item[1]))
						return [newCoordinate.lat, newCoordinate.lng]
				  })
				: item.geometry_rings[0].map((item: any) => {
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
