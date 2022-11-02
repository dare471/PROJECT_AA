import { IComment } from './types'

import { instance } from './base'

class _CommentApi {
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
					CATEGORY_ID: 1,
					USERS_ID: 1,
					TYPE: 1
				}
			})

			return res.data

			//TODO: Pull down Abstract Error
			// throw new Error('Комментарий не может отправиться')
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
					CATEGORY_ID: 1
				}
			})

			return res.data

			//TODO: Pull down Abstract Error
			// throw new Error('Нету комментарии')
		} catch (err) {
			throw err
		}
	}
}

export const CommentApi = new _CommentApi()
