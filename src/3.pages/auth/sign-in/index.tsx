import { SignInForm } from '@/5.features/auth'

import { Article, Container } from '@/7.shared/ui'

import './styles.scss'

export const SignInPage = () => {
	return (
		<section className='login_section'>
			<Container>
				<h2 className='login_title'>Вход</h2>
				<Article className='login_article'>
					<SignInForm />
				</Article>
			</Container>
		</section>
	)
}
