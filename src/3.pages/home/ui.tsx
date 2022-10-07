import { useNavigate } from 'react-router'
import { ROUTE_TO_MAP } from '@/7.shared/config'
import { Button, Main, Section } from '@/7.shared/ui'
import './styles.scss'

export const HomePage = () => {
	const navigate = useNavigate()

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
