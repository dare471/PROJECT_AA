import { FC, PropsWithChildren } from 'react'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'
import './styles.scss'

export const DefaultLayout: FC<PropsWithChildren> = ({ children, ...props }) => {
	return (
		<div className='page_wrapper'>
			<div className='page_header'>
				<Header />
			</div>
			<div className='page_content' {...props}>
				{children}
			</div>
			<div className='page_footer'>
				<Footer />
			</div>
		</div>
	)
}
