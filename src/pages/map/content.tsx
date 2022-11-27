import styled from 'styled-components'

import { Map } from '~src/widgets/map'
import { Sidebar } from '~src/widgets/map-sidebar'

import { ContentTemp } from '~src/shared/ui'

export function MapPageContent() {
	return (
		<Main>
			<Content>
				<Sidebar />
				<Map />
			</Content>
		</Main>
	)
}

const Content = styled.div`
	display: flex;
	width: 100%;
	height: 100%;

	position: relative;
`

const Main = styled(ContentTemp.Main)`
	padding: 0;
`
