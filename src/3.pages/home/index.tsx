import { useNavigate } from 'react-router'

import { routes } from '@/7.shared/config'
import { useTitle } from '@/7.shared/lib/dom'
import { Button } from '@/7.shared/ui'

import './styles.scss'

export const HomePage = () => {
	useTitle('Home')
	const navigate = useNavigate()

	const handleClick = () => {
		navigate(routes.map({}))
	}

	return (
		<section className='home_section'>
			<div>
				<Button className='home_button' onClick={handleClick}>
					Go To Map
				</Button>
			</div>
		</section>
	)
}
