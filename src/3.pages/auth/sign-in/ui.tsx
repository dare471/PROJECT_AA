import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useLocation } from 'react-router'
import { SignInForm } from '@/5.features/auth/sign-in'
import { useAuth } from '@/6.entities/user'
import { ROUTE_TO_MAP } from '@/7.shared/config'
import { Article, Container, Main, Section } from '@/7.shared/ui'
import './styles.scss'

export const SignInPage: FC = () => {
	const { isAuth, success, error } = useAuth()
	const { state } = useLocation()

	return (
		<Main className='login_main'>
			<Container>
				<Section className='login_section'>
					<h2 className='login_title'>Вход</h2>
					<Article className='login_article'>
						<SignInForm />
					</Article>
				</Section>
			</Container>
		</Main>
	)
}
