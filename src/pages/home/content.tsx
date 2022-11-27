import { useNavigate } from 'react-router'
import styled from 'styled-components'

import { routes } from '~src/shared/routes'
import { Button, ContentTemp } from '~src/shared/ui'

export function HomePageContent() {
	const navigate = useNavigate()

	return (
		<Main>
			<ContentTemp.Center>
				<Content>
					<Button onClick={() => navigate(routes.map)}>Go To Map</Button>
				</Content>
			</ContentTemp.Center>
		</Main>
	)
}

const Main = styled.main`
	display: flex;
	flex-shrink: 0;
	height: 100%;
`

const Content = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
`
