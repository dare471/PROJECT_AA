import { FC, PropsWithChildren } from 'react'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'
import './styles.scss'

export const DefaultLayout: FC<PropsWithChildren> = ({
	children,
	...props
}) => {
	return (
		<div className='page_wrapper'>
			<div className='header_wrapper'>
				<Header />
			</div>
			<div className='content_wrapper' {...props}>
				{children}
			</div>
			<div className='footer_wrapper'>
				<Footer />
			</div>
		</div>
	)
}
