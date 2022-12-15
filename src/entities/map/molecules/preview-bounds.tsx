import { Model, modelView } from 'effector-factorio'
import { useStore } from 'effector-react'
import { LatLngBounds } from 'leaflet'
import styled from 'styled-components'

import { theme } from '~src/shared/lib'
import { Text } from '~src/shared/ui'

import { mapFactory } from '../map-model'

interface Props {
	model: Model<typeof mapFactory>
	className?: string
}

export const PreviewBounds = modelView(mapFactory, ({ model, className }: Props) => {
	const previewBounds = useStore(model.$previewBounds)
	if (!previewBounds) return null

	return (
		<Container className={className}>
			<Text type='span'>
				Bounds Lat {previewBounds instanceof LatLngBounds ? previewBounds.getCenter().lat : null}
			</Text>
			<Text type='span'>
				Bounds Lng {previewBounds instanceof LatLngBounds ? previewBounds.getCenter().lng : null}
			</Text>
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
