import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { UseMutationResult } from 'react-query'
import ReactTextareaAutosize from 'react-textarea-autosize'
import * as yup from 'yup'

import { CommentApi } from '@/7.shared/api'
import { useMutationCustom } from '@/7.shared/lib/react-query'
import { Button, ErrorSubMessage } from '@/7.shared/ui'

import './styles.scss'

type TMapCommentFormProps = {
	id: string
	mapCommentsMutation: UseMutationResult
}

const schema = yup.object().shape({
	comment: yup.string().min(3).required()
})

export const MapCommentForm = ({ id, mapCommentsMutation }: TMapCommentFormProps) => {
	const [postCommentMutation] = useMutationCustom((signal, data: any) => {
		return CommentApi.postComment(id, data)
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
				postCommentMutation.mutate(data.comment)
				setTimeout(() => {
					mapCommentsMutation.mutate(id)
				}, 1000)
			} catch (err) {
				console.log(err)
			}
		})()
	}

	return (
		<form className='comment_modal_comment' onSubmit={handleSubmit(onSubmit)}>
			<ReactTextareaAutosize placeholder='Ваш комментарий' {...register('comment')} />
			<ErrorSubMessage error={errors} trait='comment' name='message' />
			<Button className='comment_modal_button' type='submit'>
				Отправить
			</Button>
		</form>
	)
}
