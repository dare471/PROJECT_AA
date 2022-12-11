import styled from 'styled-components'

import { theme } from '~src/shared/lib'
import { ContentTemp, Logo } from '~src/shared/ui'

export const Footer = () => {
	return (
		<Container>
			<ContentTemp.Center>
				<Content>
					<Logo />
				</Content>
			</ContentTemp.Center>
		</Container>
	)
}

const Container = styled.footer`
	display: flex;
	background-color: var(${theme.palette.bnw950});
`

const Content = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 100px;
`
