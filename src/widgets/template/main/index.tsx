import { Outlet } from 'react-router'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'

export const MainTemplate = () => {
	return (
		<div className='page_wrapper'>
			<div className='page_header'>
				<Header.PublicHeader />
			</div>
			<div className='page_content'>
				<Outlet />
			</div>
			<div className='page_footer'>
				<Footer />
			</div>
		</div>
	)
}
