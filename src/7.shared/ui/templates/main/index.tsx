import { Outlet } from 'react-router'

import { Footer } from '@/4.widgets/footer'
import { Header } from '@/4.widgets/header'

import './styles.scss'

export const MainTemplate = () => {
	return (
		<div className='page_wrapper'>
			<div className='page_header'>
				<Header />
			</div>
			<main className='page_content'>
				<Outlet />
			</main>
			<div className='page_footer'>
				<Footer />
			</div>
		</div>
	)
}
