import { FC, PropsWithChildren } from 'react'
import { Main } from '@/7.shared/ui'
import './styles.scss'

export const SignInTemplate: FC<PropsWithChildren> = ({ children }) => {
	return <Main className='login_main'>{children}</Main>
}
