import styled from 'styled-components'

import { MoveButton, XInput, YInput, ZoomInput } from '~src/features/map/input'

export const MapToolbar = () => {
	return (
		<Container>
			<Content>
				<XInput />
				<YInput />
				<ZoomInput />
				<MoveButton />
			</Content>
		</Container>
	)
}

const Container = styled.aside`
	width: 100%;
	height: 100%;

	position: absolute;
	top: 0;
	left: 0;
`

const Content = styled.div`
	display: flex;
	gap: 1rem;
	height: 3rem;

	position: absolute;
	top: 1rem;
	right: 1rem;
	z-index: 500;
`
