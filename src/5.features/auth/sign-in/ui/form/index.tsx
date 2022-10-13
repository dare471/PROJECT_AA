import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useAuth } from '@/6.entities/user'
import { Button, ErrorMessage, TextField } from '@/7.shared/ui'
import './styles.scss'

const schema = yup.object().shape({
	// .matches(/[A-Z]/g, 'You would have UpperCase')
	email: yup.string().email().required(),
	password: yup.string().min(3).required()
})

export const SignInForm = () => {
	const { userSignIn, error, success } = useAuth()
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors }
	} = useForm({
		mode: 'onChange',
		resolver: yupResolver(schema)
	})

	const onSubmit = async (data: any) => {
		try {
			const res = await userSignIn(data.email, data.password)
		} catch (err) {
			console.log(err)
			setError('email', { message: 'UnCorrect email' })
			setError('password', { message: 'UnCorrect password' })
		}
	}

	useEffect(() => {
		if (error) {
			setError('email', { message: '' })
			setError('password', { message: error })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [error])

	return (
		<form className='login_form' onSubmit={handleSubmit(onSubmit)}>
			<TextField
				classNameWrapper='login_textfield_wrapper first'
				classNameInput={errors.email ? 'error' : success ? 'success' : ''}
				title='Почта'
				type='email'
				id='email'
				autoComplete='email'
				{...register('email')}
			></TextField>
			<ErrorMessage errors={errors} name='email' prop='message' />
			<TextField
				classNameWrapper='login_textfield_wrapper second'
				classNameInput={errors.password ? 'error' : success ? 'success' : ''}
				title='Пароль'
				type='password'
				id='password'
				autoComplete='current-password'
				{...register('password')}
			></TextField>
			<ErrorMessage errors={errors} name='password' prop='message' />
			<Button className='login_button' type='submit'>
				Отправить
			</Button>
		</form>
	)
}
