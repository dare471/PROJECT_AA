import { CRS, Point } from 'leaflet'

export const polygonNormalizer = (items: any) => {
	return items.geometry.coordinates[0].map((item: any) => [item[1], item[0]])
}

export const areaNormalizer = (res: any) => {
	return res.map((item: any) => ({
		...item,
		COORDINATES: JSON.parse(item.COORDINATES)
	}))
}

export const Normalizer3857 = (res: any) => {
	const proj = CRS.EPSG3857
	return res.map((item: any) => {
		if (item.COORDINATES) {
			const newCOORDINATES = item.COORDINATES[0].map((item: any) => {
				const newCoordinate = proj.unproject(new Point(item[0], item[1]))
				return [newCoordinate.lat, newCoordinate.lng]
			})

			return {
				...item,
				COORDINATES: [newCOORDINATES]
			}
		}
		return item
	})
}
