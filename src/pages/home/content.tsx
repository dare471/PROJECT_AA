import { useNavigate } from 'react-router'
import styled from 'styled-components'

import { routes } from '~src/shared/routes'
import { Button, ContentTemp, Text } from '~src/shared/ui'

export const HomePageContent = () => {
	const navigate = useNavigate()

	return (
		<ContentTemp.Article>
			<ContentTemp.Center>
				<Content>
					<Text type='h3'>Welcome To AlemAgro</Text>
					<MapButton onClick={() => navigate(routes.map)}>Go To Map</MapButton>
				</Content>
			</ContentTemp.Center>
		</ContentTemp.Article>
	)
}

const Content = styled.div`
	display: flex;
	gap: 5rem;
	flex-direction: column;
	align-items: center;
	height: 100%;

	padding-top: 20rem;
	//padding-bottom: 10rem;
`

const MapButton = styled(Button)`
	padding: 1rem 2rem;
`
