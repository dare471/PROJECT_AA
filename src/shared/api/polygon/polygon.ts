import { instance } from './base';
import { areaPolygonsMock, districtPolygonsMock } from './mock';
import { Normalizer3857, areaNormalizer } from './normalizer';


export const getAreaPolygon = async (id?: string) => {
	// console.log(process.env.API_URL)
	// const res = await instance({
	// 	method: 'GET',
	// 	url: `api/fef`
	// })

	// return Normalizer3857(areaNormalizer(res.data))

	return areaPolygonsMock.features
}

export const getDistrictPolygon = async (id?: string) => {
	// const res = await instance({
	// 	method: 'GET',
	// 	url: `/ff?id=${id}`
	// })
	// return res.data

	return districtPolygonsMock.features
}

export const getPolygons = async () => {
	const res = await instance({
		method: 'GET',
		url: `api/client_p/791710000`
	})
	console.log(res.data)

	return Normalizer3857(areaNormalizer(res.data))
}