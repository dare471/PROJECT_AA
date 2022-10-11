import { yupResolver } from '@hookform/resolvers/yup'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import ReactTextareaAutosize from 'react-textarea-autosize'
import * as yup from 'yup'
import { CommentApi } from '@/7.shared/api'
import { useMutationCustom } from '@/7.shared/lib'
import { Button, ErrorMessage } from '@/7.shared/ui'
import { IMapCommentFormProps } from './types'
import './styles.scss'

const schema = yup.object().shape({
	comment: yup.string().min(3).required()
})

export const MapCommentForm: FC<IMapCommentFormProps> = ({ id, commentsMutation }) => {
	const [postCommentMutation] = useMutationCustom((data: any) => {
		return CommentApi.postComment(id, data.comment)
	})

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		mode: 'onChange',
		resolver: yupResolver(schema)
	})

	const onSubmit = (data: any) => {
		;(async () => {
			try {
				postCommentMutation.mutate(data)
				setTimeout(() => {
					commentsMutation.reset()
				}, 1000)
			} catch (err) {
				console.log(err)
			}
		})()
	}

	return (
		<form className='map_comment_modal_comment' onSubmit={handleSubmit(onSubmit)}>
			<ReactTextareaAutosize placeholder='Ваш комментарий' {...register('comment')} />
			<ErrorMessage errors={errors} name='comment' prop='message' />
			<Button className='map_comment_modal_button' type='submit'>
				Отправить
			</Button>
		</form>
	)
}
