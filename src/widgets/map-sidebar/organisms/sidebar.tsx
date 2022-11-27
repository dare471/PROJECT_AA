import styled from 'styled-components'

import { theme } from '~src/shared/lib'

export function Sidebar() {
	return <Container>Sidebar</Container>
}

const Container = styled.aside`
	flex: 1 0 auto;
	width: 20rem;
	max-width: 100%;
	height: 100%;

	background-color: var(${theme.palette.bnw150});
`
