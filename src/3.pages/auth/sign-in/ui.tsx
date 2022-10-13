import { FC } from 'react'
import { SignInForm } from '@/5.features/auth'
import { Article, Container, Section } from '@/7.shared/ui'
import './styles.scss'
import { SignInTemplate } from './template'

export const SignInPage: FC = () => {
	return (
		<SignInTemplate>
			<Section className='login_section'>
				<Container>
					<h2 className='login_title'>Вход</h2>
					<Article className='login_article'>
						<SignInForm />
					</Article>
				</Container>
			</Section>
		</SignInTemplate>
	)
}
