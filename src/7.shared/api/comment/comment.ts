import { IComment } from './types'
import { instance } from './base'

class CommentApiClass {
	async postComment(id: string, description: string): Promise<IComment> {
		try {
			const res = await instance({
				method: 'POST',
				url: '/add',
				headers: {
					'Content-TYPE': 'application/json'
				},
				data: {
					ELEMENT_ID: id,
					DESCRIPTION: description,
					CATEGORY_ID: 4,
					USERS_ID: 1,
					TYPE: 1
				}
			})

			if (res.data && res.data.success) {
				return res.data
			}
			throw new Error('Коментарий не может отправиться')
		} catch (err) {
			throw err
		}
	}

	getCommentsById = async (id: string): Promise<IComment> => {
		try {
			const res = await instance({
				method: 'POST',
				url: '/list',
				data: {
					ELEMENT_ID: id,
					CATEGORY_ID: 4
				}
			})

			if (res.data) {
				return res.data
			}

			throw new Error('Нету комментарии')
		} catch (err) {
			throw err
		}
	}
}

export const CommentApi = new CommentApiClass()
