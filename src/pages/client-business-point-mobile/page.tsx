import { Box, Container, Flex } from '@chakra-ui/react'
import { useUnit } from 'effector-react'
import React from 'react'
import { Polygon } from 'react-leaflet'
import { useParams } from 'react-router'

import { LandsToLandFactory } from '~src/features/lands-to-land'

import { MapFactory } from '~src/entities/map'

import * as model from './model'

export function ClientBusinessPointMobilePage() {
	const [handleMount, handleUnmount] = useUnit([
		model.clientBusinessPointMobilePageMounted,
		model.clientBusinessPointMobilePageUnMounted,
	])
	const { clientId } = useParams<{ clientId: string }>()

	React.useEffect(() => {
		handleMount({ clientId: Number(clientId) })

		return () => {
			handleUnmount()
		}
	}, [clientId, handleMount, handleUnmount])

	return (
		<Box>
			<Container minW='full' minH='100vh'>
				<Flex direction='column' flexGrow={1} justify='space-between' align='center'>
					<MapFactory.Map
						model={model.$$map}
						style={{ width: '100vw', height: '100vh' }}
						containerProps={{ height: '100vh' }}
					>
						<LandsToLandFactory.Lands model={model.$$clientPlotsToPlot}>
							{({ land, onClick }) => (
								<Polygon
									positions={land.geometryRings as any}
									pathOptions={{ color: 'blue' }}
									eventHandlers={{ click: () => onClick(land.id) }}
								/>
							)}
						</LandsToLandFactory.Lands>
						<LandsToLandFactory.Land model={model.$$clientPlotsToPlot}>
							{({ land }) => <Polygon positions={land.geometryRings as any} pathOptions={{ color: 'black' }} />}
						</LandsToLandFactory.Land>
					</MapFactory.Map>
				</Flex>
			</Container>
		</Box>
	)
}
