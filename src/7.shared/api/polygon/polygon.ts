import { IClientInfo, TPolygon } from './types'
import { instance } from './base'
import { GeometryJsonNormalizer, GeometryNormalizer3857 } from './normalizer'

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
			const { data: resData } = await instance({
				method: 'GET',
				url: `/region`,
				signal
			})

			return {
				...resData,
				data: GeometryNormalizer3857(GeometryJsonNormalizer(resData.data))
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
				const { data: resData } = await instance({
					method: 'GET',
					url: `/district/${id}`,
					signal
				})

				return {
					...resData,
					data: GeometryNormalizer3857(GeometryJsonNormalizer(resData.data))
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
				const { data: resData } = await instance({
					method: 'GET',
					url: `/getpolygons/${id}`,
					signal
				})

				return {
					...resData,
					data: GeometryNormalizer3857(GeometryJsonNormalizer(resData.data))
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
				const { data: resData } = await instance({
					method: 'GET',
					url: `/getclientinfo/${id}`,
					signal
				})

				return {
					...resData,
					data: GeometryNormalizer3857(GeometryJsonNormalizer(resData.data))
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
				const { data: resData } = await instance({
					method: 'GET',
					url: `/getpolygondetail/${id}`,
					signal
				})

				return {
					...resData,
					data: GeometryNormalizer3857(GeometryJsonNormalizer(resData.data))
				}
			} catch (err) {
				throw err
			}
		} else {
			throw new Error('has not a correct param')
		}
	}
}

export const PolygonApi = new PolygonApiClass()
