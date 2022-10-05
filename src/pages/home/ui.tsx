import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useLocation } from 'react-router'
import { ROUTE_TO_MAP } from '@/shared/lib'
import { Button, Main } from '@/shared/ui'
import { Section } from '@/shared/ui/section'
import './styles.scss'

export const HomePage = () => {
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		console.log(location)
	}, [])

	const handleClick = () => {
		navigate(ROUTE_TO_MAP())
	}

	return (
		<Main>
			<Section>
				<div>
					<Button className='home_button' onClick={handleClick}>
						Go To Map
					</Button>
				</div>
			</Section>
		</Main>
	)
}
