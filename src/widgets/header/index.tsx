import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import { breakpoints, theme } from '~src/shared/lib'
import { routes } from '~src/shared/routes'
import { Button, ContentTemp, Logo } from '~src/shared/ui'

export function Header() {
	return (
		<Container>
			<ContentTemp.Center>
				<Content>
					<Logo />
					<Nav>
						<Link to={routes.home}>Home</Link>
						<Link to={routes.map}>Map</Link>
					</Nav>
					<SignUpButton>Sign Up</SignUpButton>
				</Content>
			</ContentTemp.Center>
		</Container>
	)
}

const Container = styled.header`
	display: flex;
	flex-shrink: 0;
	justify-content: center;
	align-items: center;
	width: 100%;

	position: absolute;
	top: 0;
	left: 0;

	background-color: var(${theme.palette.bnw100});
	border-bottom: 1px solid var(${theme.palette.bnw200});
`

const Content = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	align-items: center;
	height: 72px;
`

const Nav = styled.nav`
	display: flex;
	justify-content: center;
	align-items: center;

	${breakpoints.devices.mobile} {
		flex-wrap: wrap;
	}
`

const Link = styled(NavLink)`
	font-size: 1.2rem;
	font-weight: 500;
	font-family: inherit;
	color: var(${theme.palette.bnw600});

	text-decoration: none;

	margin-right: 0.5rem;
	margin-left: 0.5rem;
`

const SignUpButton = styled(Button)`
	width: fit-content;
	justify-self: end;

	border-radius: 0.5rem;
`
