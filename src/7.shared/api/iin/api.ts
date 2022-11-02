import { instance } from './base'

class _IinApi {
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

export const IinApi = new _IinApi()
