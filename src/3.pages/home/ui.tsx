import { useNavigate } from 'react-router'
import { routes } from '@/7.shared/config'
import { Button, Main, Section } from '@/7.shared/ui'
import './styles.scss'

export const HomePage = () => {
	const navigate = useNavigate()

	const handleClick = () => {
		navigate(routes.map({}))
	}

	return (
		<Main className='home_main'>
			<Section className='home_section'>
				<div>
					<Button className='home_button' onClick={handleClick}>
						Go To Map
					</Button>
				</div>
			</Section>
		</Main>
	)
}
