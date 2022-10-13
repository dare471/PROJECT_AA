import { IClientInfo, TPolygon } from './types'
import { instance } from './base'
import { JsonNormalizer, Normalizer3857 } from './normalizer'

//* Use For Test *//
// import { areaPolygonsMock, districtPolygonsMock } from './mock'

class PolygonApiClass {
	/**
	 *
	 * @param param0
	 * @returns
	 */
	async getCountry({ signal }: { signal: AbortSignal | undefined }): Promise<TPolygon> {
		try {
			console.log(process.env.API_URL)
			const { data } = await instance({
				method: 'GET',
				url: `/region`,
				signal
			})

			if (data && data?.data && data.data.length > 0 && data.success) {
				return Normalizer3857(JsonNormalizer(data))
			} else {
				throw new Error('Нету данных')
			}
		} catch (err) {
			throw err
		}

		//* Use For Test *//
		// return areaPolygonsMock.features
	}

	/**
	 *
	 * @param param0
	 * @returns
	 */
	async getRegion({ id, signal }: { id: string | null; signal: AbortSignal | undefined }): Promise<TPolygon> {
		if (id) {
			try {
				const { data } = await instance({
					method: 'GET',
					url: `/district/${id}`,
					signal
				})

				if (data && data?.data && data.data.length > 0 && data.success) {
					return Normalizer3857(JsonNormalizer(data))
				} else {
					throw new Error('Нету данных об этой области')
				}
			} catch (err) {
				throw err
			}
		} else {
			throw new Error('has not a correct param')
		}

		//* Use For Test *//
		// return districtPolygonsMock.features
	}

	/**
	 *
	 * @param param0
	 * @returns
	 */
	async getDistrict({ id, signal }: { id: string | null; signal: AbortSignal | undefined }): Promise<TPolygon> {
		if (id) {
			try {
				const { data } = await instance({
					method: 'GET',
					url: `/getpolygons/${id}`,
					signal
				})

				console.log(data)
				if (data && data?.data && data.data.length > 0 && data.success) {
					return Normalizer3857(JsonNormalizer(data))
				} else {
					throw new Error('Нету данных по полигону клиентов')
				}
			} catch (err) {
				throw err
			}
		} else {
			throw new Error('has not a correct param')
		}

		//* Use For Test *//
		// return polygonsMock
	}

	/**
	 *
	 * @param param0
	 * @returns
	 */
	async getClient({ id, signal }: { id: string | null; signal: AbortSignal | undefined }): Promise<IClientInfo | void> {
		if (id) {
			try {
				const { data } = await instance({
					method: 'GET',
					url: `/getclientinfo/${id}`,
					signal
				})

				if (data && data?.data && data.data.length > 0 && data.success) {
					return Normalizer3857(JsonNormalizer(data))
				} else {
					throw new Error('Нету данных клиента и его полигонов')
				}
			} catch (err) {
				throw err
			}
		} else {
			throw new Error('has not a correct param')
		}
	}

	/**
	 *
	 * @param param0
	 * @returns
	 */
	async getClientPolygon({ id, signal }: { id: string | null; signal: AbortSignal | undefined }) {
		if (id) {
			try {
				const { data } = await instance({
					method: 'GET',
					url: `/getpolygondetail/${id}`,
					signal
				})

				if (data && data?.data && data.data.length > 0 && data.success) {
					return Normalizer3857(JsonNormalizer(data))
				}
			} catch (err) {
				throw err
			}
		} else {
			throw new Error('has not a correct param')
		}
	}

	/**
	 *
	 * @param param0
	 * @returns
	 */
	async findByIin({ iin, signal }: { iin: number; signal: AbortSignal | undefined }) {
		const { data } = await instance({
			method: 'GET',
			url: `/findbyiin/${iin}`,
			signal
		})

		return data
	}
}

export const PolygonApi = new PolygonApiClass()
