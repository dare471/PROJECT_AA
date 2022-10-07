import { IClientInfo, TPolygon } from './types'
import { instance } from './base'
import { JsonNormalizer, Normalizer3857 } from './normalizer'

//* Use For Test *//
// import { areaPolygonsMock, districtPolygonsMock } from './mock'

class polygonApiClass {
	/////////////////////////////////////////////////////////////////////////////
	async getRegionPolygons({ signal }: { signal: AbortSignal | undefined }): Promise<TPolygon> {
		try {
			console.log(process.env.API_URL)
			const res = await instance({
				method: 'GET',
				url: `/region`,
				signal
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

	/////////////////////////////////////////////////////////////////////////////
	async getDistrictPolygons({ id, signal }: { id: string; signal: AbortSignal | undefined }): Promise<TPolygon> {
		try {
			const res = await instance({
				method: 'GET',
				url: `/district/${id}`,
				signal
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

	/////////////////////////////////////////////////////////////////////////////
	async getPolygons({ id, signal }: { id: string; signal: AbortSignal | undefined }): Promise<TPolygon> {
		try {
			const res = await instance({
				method: 'GET',
				url: `/getpolygons/${id}`,
				signal
			})

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

	/////////////////////////////////////////////////////////////////////////////
	async getClientInfo({ id, signal }: { id: string; signal: AbortSignal | undefined }): Promise<IClientInfo | void> {
		try {
			const res = await instance({
				method: 'GET',
				url: `/getclientinfo/${id}`,
				signal
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

	/////////////////////////////////////////////////////////////////////////////
	async getPolygonDetails({ id, signal }: { id: string; signal: AbortSignal | undefined }) {
		try {
			const res = await instance({
				method: 'GET',
				url: `/getpolygondetail/${id}`,
				signal
			})

			console.log(res)
			if (res.data && res.data?.data && res.data.data.length > 0 && res.data.success) {
				return Normalizer3857(JsonNormalizer(res.data))
			}
		} catch (err) {
			throw err
		}
	}

	/////////////////////////////////////////////////////////////////////////////
	async findByIin({ iin, signal }: { iin: number; signal: AbortSignal | undefined }) {
		const res = await instance({
			method: 'GET',
			url: `/findbyiin/${iin}`,
			signal
		})

		return res.data
	}
}

export const polygonApi = new polygonApiClass()
