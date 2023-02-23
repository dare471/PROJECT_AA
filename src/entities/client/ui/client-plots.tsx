import {
	Accordion,
	AccordionButton,
	AccordionItem,
	AccordionPanel,
	Box,
	Card,
	CardBody,
	Center,
	Spinner,
	Stack,
	type StackProps,
	Text,
} from '@chakra-ui/react'
import { useUnit } from 'effector-react'

import { DescriptionText } from '~src/shared/ui'

import type { createClientPlots } from '../model'
import { ClientBadge } from './client-badge'
import { ClientPlotCard } from './client-plot-card'

interface ClientPlotsProps extends StackProps {
	model: ReturnType<typeof createClientPlots>
	onPlotClick: (args: { plotId: number }) => void
}

export function ClientPlots(props: ClientPlotsProps) {
	const { model, onPlotClick, ...otherProps } = props
	const [client, clientPlots, clientPending] = useUnit([model.$client, model.$clientPlots, model.$clientPlotsPending])

	if (clientPending) {
		return (
			<Center>
				<Spinner />
			</Center>
		)
	}

	return (
		<Stack {...otherProps}>
			{client && clientPlots.length !== 0 ? (
				<>
					<Accordion allowToggle bg='white' pos='sticky' top='0' zIndex='1'>
						<AccordionItem>
							<AccordionButton>Информация по клиенту</AccordionButton>
							<AccordionPanel>
								<Card variant='filled'>
									<CardBody>
										<Stack>
											<Stack direction='row'>
												<Text fontSize='xl' fontWeight='bold'>
													{client.clientName}
												</Text>
												<Box>
													<ClientBadge guid={client.guid} />
												</Box>
											</Stack>
											<DescriptionText title='Иин/Бин:'>{client.clientBin}</DescriptionText>
											<DescriptionText title='Адрес:'>{client.clientAddress}</DescriptionText>
											<DescriptionText title='Деятельность:'>{client.clientActivity}</DescriptionText>
										</Stack>
									</CardBody>
								</Card>
							</AccordionPanel>
						</AccordionItem>
					</Accordion>
					<Stack>
						{clientPlots.map((clientPlot, index) => (
							<ClientPlotCard key={index} clientPlot={clientPlot} onClick={onPlotClick} />
						))}
					</Stack>
				</>
			) : (
				<Center>Нету данных</Center>
			)}
		</Stack>
	)
}
