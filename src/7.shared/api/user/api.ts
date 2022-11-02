import { IUserInfo } from './types'

import { instance } from './base'

class _UserApi {
	async getUserInfo(id: string): Promise<IUserInfo> {
		try {
			const res = await instance({
				method: 'GET',
				url: `/user_data/${id}`
			})

			return res.data[0]

			//TODO: Pull down Abstract Error
			// throw new Error('Не правильный id')
		} catch (err) {
			throw err
		}
	}
}

export const UserApi = new _UserApi()
