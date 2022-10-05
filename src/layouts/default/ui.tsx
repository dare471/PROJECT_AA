import { FC, PropsWithChildren } from 'react'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'
import { IDefaultLayoutProps } from './types'
import './styles.scss'
import { useAuth } from '@/entities/user'

export const DefaultLayout: FC<PropsWithChildren<IDefaultLayoutProps>> = ({ children, layoutClassName, ...props }) => {
	const { isAuth } = useAuth()

	return (
		<div className={`page_wrapper${layoutClassName ? ' ' + layoutClassName : ''}`}>
			<div className='page_header'>{isAuth ? <Header.ProtectedHeader /> : <Header.PublicHeader />}</div>
			<div className='page_content' {...props}>
				{children}
			</div>
			<div className='page_footer'>
				<Footer />
			</div>
		</div>
	)
}
