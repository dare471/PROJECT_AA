import { IUser } from './types'
import { instance } from './base'

class UserApiClass {
	async signIn(email: string, password: string): Promise<IUser> {
		try {
			const res = await instance({
				method: 'POST',
				url: '/login',
				data: {
					email,
					password
				}
			})

			if (res.data && res.data.status) {
				return res.data
			}

			throw new Error('Не правильный пароль или почта')
		} catch (err) {
			throw err
		}
	}
}

export const UserApi = new UserApiClass()
