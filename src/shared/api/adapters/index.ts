import L from 'leaflet'

//////////////////////////////////////////////// Functions /////////////////////////////////////////////////////
export function getNormalGeometries(geometries: number[][][]): number[][][] {
	try {
		const proj = L.CRS.EPSG3857

		if (geometries) {
			const newGeometries = geometries[0]!.map((geometry: any) => {
				const newGeometry = proj.unproject(new L.Point(geometry[0], geometry[1]))
				return [newGeometry.lat, newGeometry.lng]
			})

			return [newGeometries]
		}

		return geometries
	} catch (err) {
		throw err
	}
}

export function getNormalGeometriesLatLng(geometries: number[][][]): number[][][] {
	return [geometries['0']!.map((latlng) => [latlng[1]!, latlng[0]!])]
}

export function getNormalGuid(guid: 0 | 1): boolean {
	return guid === 1 ? true : false
}
