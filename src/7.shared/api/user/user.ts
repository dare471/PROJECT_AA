import axios from 'axios'
import { IUser, IUserInfo } from './types'
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
	async getUserInfo(id: string): Promise<IUserInfo> {
		try {
			const res = await axios({
				method: 'GET',
				url: `http://192.168.1.16/api/user_data/${id}`
			})

			if (res.data) {
				return res.data[0]
			}

			throw new Error('Не правильный id')
		} catch (err) {
			throw err
		}
	}
}

export const UserApi = new UserApiClass()
