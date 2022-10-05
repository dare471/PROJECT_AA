import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useLocation } from 'react-router'
import { Layout } from '@/layouts'
import { MainTemplate } from '@/widgets/template'
import { SignUpForm } from '@/features/sign-up-form'
import { ROUTE_TO_MAP } from '@/shared/lib'
import { Article, Container, Main, Section } from '@/shared/ui'
import './styles.scss'
import { useAuth } from '@/entities/user'

export const SignInPage: FC = () => {
	const { isAuth, success, error } = useAuth()
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		console.log(location)
		if (isAuth) {
			navigate(ROUTE_TO_MAP())
		}
	}, [isAuth])

	return (
		<Main className='login_main'>
			<Container>
				<Section className='login_section'>
					<h2 className='login_title'>Вход</h2>
					<Article className='login_article'>
						<SignUpForm />
					</Article>
				</Section>
			</Container>
		</Main>
	)
}
