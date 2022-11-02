import { TUserCredential } from './types'

import { instance } from './base'

class _AuthApi {
	async signIn(email: string, password: string): Promise<TUserCredential> {
		try {
			const res = await instance({
				method: 'POST',
				url: '/login',
				data: {
					email,
					password
				}
			})

			return res.data

			//TODO: Pull down Abstract Error
			// throw new Error('Не правильный пароль или почта')
		} catch (err) {
			throw err
		}
	}
}

export const AuthApi = new _AuthApi()
