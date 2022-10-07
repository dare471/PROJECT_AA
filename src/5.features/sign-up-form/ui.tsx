import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useAuth } from '@/6.entities/user'
import { Button, ErrorMessage } from '@/7.shared/ui'
import { TextField } from '@/7.shared/ui/textfield'
import './styles.scss'

const schema = yup.object().shape({
	// .matches(/[A-Z]/g, 'You would have UpperCase')
	email: yup.string().email().required(),
	password: yup.string().min(3).required()
})

export const SignInForm = () => {
	const { userSignIn } = useAuth()
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
			setError('email', { message: 'UnCorrect email' })
			setError('password', { message: 'UnCorrect password' })
		}
	}

	return (
		<form className='login_form' onSubmit={handleSubmit(onSubmit)}>
			<TextField
				classNameWrapper='login_textfield_wrapper first'
				title='Почта'
				type='email'
				id='email'
				autoComplete='email'
				{...register('email')}
			></TextField>
			<ErrorMessage errors={errors} name='email' prop='message' />
			<TextField
				classNameWrapper='login_textfield_wrapper second'
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
