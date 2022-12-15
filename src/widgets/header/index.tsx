import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import { breakpoints, theme } from '~src/shared/lib'
import { routes } from '~src/shared/routes'
import { Button, ContentTemp, Logo } from '~src/shared/ui'

export const Header = () => {
	return (
		<Container>
			<ContentTemp.Center>
				<Content>
					<Logo />
					<Nav>
						<Link to={routes.home}>Главная</Link>
						<Link to={routes.map}>Карта</Link>
					</Nav>
					<SignUpButton>Регистрация</SignUpButton>
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

	background-color: var(${theme.palette.bnw1000});
	box-shadow: ${theme.shadow.bnw[0]};

	position: relative;
	z-index: 10000;
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
	color: var(${theme.palette.bnw200});
	text-decoration: none;

	margin-right: 0.5rem;
	margin-left: 0.5rem;

	&:hover {
		color: var(${theme.palette.primaryHover});
	}
`

const SignUpButton = styled(Button)`
	width: fit-content;
	justify-self: end;

	border-radius: 0.5rem;
`
