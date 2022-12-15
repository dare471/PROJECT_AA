import { Model, modelView } from 'effector-factorio'
import { useStore } from 'effector-react'
import styled from 'styled-components'

import { theme } from '~src/shared/lib'
import { Text } from '~src/shared/ui'

import { mapFactory } from '../map-model'

interface Props {
	model: Model<typeof mapFactory>
	className?: string
}

export const PreviewCenter = modelView(mapFactory, ({ model, className }: Props) => {
	const previewCenter = useStore(model.$previewCenter)

	return (
		<Container className={className}>
			<Text type='span'>X: {previewCenter.lng.toFixed(5)}</Text>
			<Text type='span'>Y: {previewCenter.lat.toFixed(5)}</Text>
		</Container>
	)
})

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 1rem;

	padding: 0.5rem 1rem;
	border-radius: ${theme.spacing(1)};

	background-color: var(${theme.palette.primary600});
	color: var(${theme.palette.bnw950});
`
