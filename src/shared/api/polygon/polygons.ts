import { IClientInfo, TPolygon } from './types'
import { instance } from './base'
import { JsonNormalizer, Normalizer3857 } from './normalizer'

//* Use For Test *//
// import { areaPolygonsMock, districtPolygonsMock } from './mock'

export const getAreaPolygon = async (): Promise<TPolygon> => {
	try {
		console.log(process.env.API_URL)
		const res = await instance({
			method: 'GET',
			url: `/region`
		})

		if (res.data && res.data?.data && res.data.data.length > 0 && res.data.success) {
			return Normalizer3857(JsonNormalizer(res.data))
		} else {
			throw new Error('Нету данных')
		}
	} catch (err) {
		throw err
	}

	//* Use For Test *//
	// return areaPolygonsMock.features
}

export const getDistrictPolygon = async (id: string): Promise<TPolygon> => {
	try {
		const res = await instance({
			method: 'GET',
			url: `/district/${id}`
		})

		if (res.data && res.data?.data && res.data.data.length > 0 && res.data.success) {
			return Normalizer3857(JsonNormalizer(res.data))
		} else {
			throw new Error('Нету данных об этой области')
		}
	} catch (err) {
		throw err
	}

	//* Use For Test *//
	// return districtPolygonsMock.features
}

export const getPolygons = async (id: string): Promise<TPolygon> => {
	try {
		const res = await instance({
			method: 'GET',
			url: `/getpolygons/${id}`
		})

		console.log()
		if (res.data && res.data?.data && res.data.data.length > 0 && res.data.success) {
			return Normalizer3857(JsonNormalizer(res.data))
		} else {
			throw new Error('Нету данных по полигону клиентов')
		}
	} catch (err) {
		throw err
	}

	//* Use For Test *//
	// return polygonsMock
}

export const getClientInfo = async (id: string): Promise<IClientInfo | void> => {
	try {
		const res = await instance({
			method: 'GET',
			url: `/getclientinfo/${id}`
		})

		if (res.data && res.data?.data && res.data.data.length > 0 && res.data.success) {
			return Normalizer3857(JsonNormalizer(res.data))
		} else {
			throw new Error('Нету данных клиента и его полигонов')
		}
	} catch (err) {
		throw err
	}
}

export const getPolygonDetail = async (id: string) => {
	try {
		const res = await instance({
			method: 'GET',
			url: `/getpolygondetail/${id}`
		})

		console.log(res)
		if (res.data && res.data?.data && res.data.data.length > 0 && res.data.success) {
			return Normalizer3857(JsonNormalizer(res.data))
		}
	} catch (err) {
		throw err
	}
}

export const findByIin = async (iin: number, signal: AbortSignal) => {
	const res = await instance({
		signal: signal,
		method: 'GET',
		url: `/find_client/${iin}`
	})

	return res.data
}
