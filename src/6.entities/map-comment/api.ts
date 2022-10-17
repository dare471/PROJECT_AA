import { UseMutationOptions } from 'react-query'
import { CommentApi } from '@/7.shared/api'
import { useMutationCustom } from '@/7.shared/lib'

export const useFetchMapComment = (options?: UseMutationOptions) => {
	const [commentsMutation, abortComments] = useMutationCustom((id: any) => {
		return CommentApi.getCommentsById(id)
	}, options)

	return [commentsMutation, abortComments] as const
}
