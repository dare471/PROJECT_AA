import { useUnit } from 'effector-react'
import React from 'react'
import styled from 'styled-components'

import { BoundToggle } from '~src/features/map/bound-toggle'

import { mapModel } from '~src/entities/map'

import { theme } from '~src/shared/lib'
import { Text } from '~src/shared/ui'

import { MapToolbar } from '../molecules'

export const MapContent = () => {
	const [positionX, positionY, zoom] = useUnit([
		mapModel.$viewPositionX,
		mapModel.$viewPositionY,
		mapModel.$viewZoom
	])
	const [selected, setSelected] = React.useState(false)

	//FIXME: rewrite toFixed to lib
	return (
		<Container>
			<MapToolbar />
			<Content>
				<BoundToggle />

				<PositionGroup>
					<Text type='p'>{positionX.toFixed(5)}</Text>
					<Text type='p'>{positionY.toFixed(5)}</Text>
				</PositionGroup>

				<ZoomContainer>
					<Text>{zoom}</Text>
				</ZoomContainer>
			</Content>
		</Container>
	)
}

const Container = styled.div`
	width: 100%;
	height: 100%;

	position: absolute;
	top: 0;
	left: 0;
`

const Content = styled.div`
	display: flex;
	gap: 1rem;

	position: absolute;
	bottom: 1rem;
	right: 1rem;
	z-index: 500;
`

const PositionGroup = styled.div`
	display: flex;
	gap: 0.5rem;
	justify-content: center;
	align-items: center;

	padding: 0.5rem 1rem;

	background-color: var(${theme.palette.primary600});
	border-radius: 0.5rem;

	color: var(${theme.palette.bnw950});
`

const ZoomContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	padding: 0.5rem 1rem;

	background-color: var(${theme.palette.primary600});
	border-radius: 0.5rem;

	color: var(${theme.palette.bnw950});
`
