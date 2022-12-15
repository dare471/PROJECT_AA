import { useUnit } from 'effector-react'
import styled from 'styled-components'

// import { LandsTreeView } from '~src/features/land/tree-view'
import { breakpoints, theme } from '~src/shared/lib'
import { Button } from '~src/shared/ui'

import * as model from './model'

export const Sidebar = () => {
	const [isActive, handleClick] = useUnit([model.$sidebarIsActive, model.clickedSidebarButton])

	return (
		<>
			<Container data-active={isActive}>
				<Content data-active={isActive}>{/*<LandsTreeView />*/}</Content>
			</Container>
			<SidebarButton hoverable data-active={isActive} onClick={() => handleClick()}>
				Список
			</SidebarButton>
		</>
	)
}

const Container = styled.aside<{ 'data-active': boolean }>`
	--container-padding-block: 10px;
	--container-padding-inline: 5px;

	flex: 1 0 auto;
	width: 30rem;
	max-width: 100%;
	height: 100%;

	position: absolute;
	top: 0;
	left: 0;
	z-index: 10000;

	transition: background-color 0.1s;

	padding: 10px 5px;

	overflow: hidden;

	&[data-active='false'] {
		pointer-events: none;
	}

	${breakpoints.devices.mobile} {
		padding: 0;

		width: 100%;
		height: 100%;
	}
`

const Content = styled.section<{ 'data-active': boolean }>`
	width: 100%;
	height: 100%;

	box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
	background-color: var(${theme.palette.bnw950});
	border-radius: 0.5rem;
	padding-top: 10px;
	padding-bottom: 4rem;

	transition: transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1);

	&[data-active='false'] {
		transform: translateY(calc(100% + var(--container-padding-block)));
	}

	${breakpoints.devices.mobile} {
		width: 100%;
		//transition: transform 0.65s cubic-bezier(0.87, 0, 0.13, 1), width 0.5s linear;

		transform: none;

		&[data-active='false'] {
			transform: translateY(calc(-100% - 76px));
		}
	}
`

const SidebarButton = styled(Button)<{ 'data-active': boolean }>`
	width: calc(30rem - 2rem);
	max-width: 100%;

	position: absolute;
	bottom: 16px;
	left: 1rem;
	z-index: 10000;

	transition: width 0.3s ease;
	padding: 0.4rem 0;

	//transform: translateY(-100%);

	&[data-active='false'] {
		width: 5rem;
		max-width: 100%;
	}

	${breakpoints.devices.mobile} {
	}
`
