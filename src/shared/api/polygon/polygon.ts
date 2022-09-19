import { TPolygons } from './types'
import { instance } from './base'
import { JsonNormalizer, Normalizer3857 } from './normalizer'

// import { areaPolygonsMock, districtPolygonsMock } from './mock'

export const getAreaPolygon = async (id?: string): Promise<TPolygons> => {
	console.log(process.env.API_URL)
	const res = await instance({
		method: 'GET',
		url: `api/region`
	})

	return Normalizer3857(JsonNormalizer(res.data))

	//* Use For Test *//
	// return areaPolygonsMock.features
}

export const getDistrictPolygon = async (id: string): Promise<TPolygons> => {
	const res = await instance({
		method: 'GET',
		url: `api/district/${id}`
	})
	console.log(res)
	return Normalizer3857(JsonNormalizer(res.data))

	//* Use For Test *//
	// return districtPolygonsMock.features
}

export const getPolygons = async (id: string): Promise<TPolygons> => {
	const res = await instance({
		method: 'GET',
		url: `api/client_p/${id}`
	})

	return Normalizer3857(JsonNormalizer(res.data))

	//* Use For Test *//
	// return polygonsMock
}
