import { TCustomAxiosResponse, TParams } from '../types'
import { TClientPolygon, TDistrictPolygon, TRegionPolygon } from './types'

import { instance } from './base'
import { getGeometryJsonNormalizer, getGeometryNormalizer3857 } from './normalizer'

//* Use For Test *//
// import { areaPolygonsMock, districtPolygonsMock } from './mock'

class _PolygonApi {
	/**
	 *
	 * @param { signal }, signal: Request Abort and etc
	 * @returns
	 */
	async getCountryWithRegion({ signal }: TParams): Promise<TRegionPolygon[]> {
		try {
			const { data: resData }: TCustomAxiosResponse<TRegionPolygon[]> = await instance({
				method: 'GET',
				url: `/country`,
				signal
			})

			console.log(resData.data)
			return getGeometryNormalizer3857(getGeometryJsonNormalizer(resData.data))
		} catch (err) {
			throw err
		}

		//* Use For Test *//
		// return areaPolygonsMock.features
	}

	/**
	 *
	 * @param { id, signal }, id: Region id, signal: Request Abort and etc
	 * @returns
	 */
	async getRegionWithDistrict({ id, signal }: TParams<{ id: string | null }>): Promise<TDistrictPolygon[]> {
		if (id) {
			try {
				const { data: resData }: TCustomAxiosResponse<TDistrictPolygon[]> = await instance({
					method: 'GET',
					url: `/region/${id}`,
					signal
				})

				return getGeometryNormalizer3857(getGeometryJsonNormalizer(resData.data))
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
	 * @param { id, signal }, id: District id, signal: Request Abort and etc
	 * @returns
	 */
	async getDistrictWithClientPolygons({ id, signal }: TParams<{ id: string | null }>): Promise<TClientPolygon[]> {
		if (id) {
			try {
				const { data: resData }: TCustomAxiosResponse<TClientPolygon[]> = await instance({
					method: 'GET',
					url: `/district/${id}`,
					signal
				})

				return getGeometryNormalizer3857(getGeometryJsonNormalizer(resData.data))
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
	 * @param { id, signal }, id: Client id, signal: Request Abort and etc
	 * @returns
	 */
	async getClientPolygonsWithClientPolygon({
		id,
		signal
	}: TParams<{
		id: string | null
	}>): Promise<TClientPolygon[]> {
		if (id) {
			try {
				const { data: resData }: TCustomAxiosResponse<TClientPolygon[]> = await instance({
					method: 'GET',
					url: `/clientPolygons/${id}`,
					signal
				})

				return getGeometryNormalizer3857(getGeometryJsonNormalizer(resData.data))
			} catch (err) {
				throw err
			}
		} else {
			throw new Error('has not a correct param')
		}
	}

	/**
	 *
	 * @param { id, signal }, id: ClientPolygon id, signal: Request Abort and etc
	 * @returns
	 */
	async getClientPolygon({ id, signal }: TParams<{ id: string | null }>): Promise<TClientPolygon[]> {
		if (id) {
			try {
				const { data: resData }: TCustomAxiosResponse<TClientPolygon[]> = await instance({
					method: 'GET',
					url: `/clientPolygon/${id}`,
					signal
				})

				return getGeometryNormalizer3857(getGeometryJsonNormalizer(resData.data))
			} catch (err) {
				throw err
			}
		} else {
			throw new Error('has not a correct param')
		}
	}

	async getRegionWithClientPolygons({ id, signal }: TParams<{ id: string | null }>): Promise<TClientPolygon[]> {
		if (id) {
			try {
				const { data: resData }: TCustomAxiosResponse<TClientPolygon[]> = await instance({
					method: 'GET',
					url: `/clientDistrict/${id}`,
					signal
				})

				return getGeometryNormalizer3857(getGeometryJsonNormalizer(resData.data))
			} catch (err) {
				throw err
			}
		} else {
			throw new Error('has not a correct param')
		}
	}

	async getRegionWithFilterClientPolygons({
		id,
		data,
		signal
	}: TParams<{ id: string | null; data: any }>): Promise<TClientPolygon[]> {
		if (id) {
			try {
				const { season, cult } = data
				const { data: resData }: TCustomAxiosResponse<TClientPolygon[]> = await instance({
					method: 'POST',
					url: `/clientDistrictv2`,
					data: {
						cato: id,
						season: season,
						cult: cult
					},
					signal
				})

				return getGeometryNormalizer3857(getGeometryJsonNormalizer(resData.data))
			} catch (err) {
				throw err
			}
		} else {
			throw new Error('has not a correct param')
		}
	}
}

export const PolygonApi = new _PolygonApi()
