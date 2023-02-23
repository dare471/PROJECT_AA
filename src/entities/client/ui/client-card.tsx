import { Box, Card, CardBody, type CardProps, Center, Spinner, Stack, Text } from '@chakra-ui/react'

import type { Client } from '~src/shared/api'
import { DescriptionText } from '~src/shared/ui'

import { ClientBadge } from './client-badge'

interface ClientCardProps extends CardProps {
	children?: React.ReactNode
	client: Client | null
	clientPending?: boolean
}

export function ClientCard(props: ClientCardProps) {
	const { client, clientPending = false, children, ...otherProps } = props

	return (
		<Card {...otherProps}>
			{client && (
				<CardBody>
					{children}
					<Stack>
						<Text fontSize='xl' fontWeight='bold'>
							{client.clientName}
						</Text>
						<Box>
							<ClientBadge guid={client.guid} />
						</Box>
						<DescriptionText title='Бин/Иин:'>{client.clientBin}</DescriptionText>
						<DescriptionText title='Адрес:'>{client.clientAddress}</DescriptionText>
						<DescriptionText title='Деятельность:'>{client.clientActivity}</DescriptionText>
						<DescriptionText title='Като:'>{client.clientCato}</DescriptionText>
					</Stack>
				</CardBody>
			)}
			{!clientPending && !client && <Center flexGrow='1'>Нету данных по клиенту</Center>}
			{clientPending && (
				<Center flexGrow='1'>
					<Spinner colorScheme='blue' />
				</Center>
			)}
		</Card>
	)
}

interface ClientShortCardProps extends CardProps {
	client: Pick<Client, 'guid' | 'clientId' | 'clientName' | 'clientActivity' | 'clientBin'>
	children?: React.ReactNode
}

export function ClientShortCard(props: ClientShortCardProps) {
	const { client, children, ...otherProps } = props

	return (
		<Card {...otherProps}>
			<CardBody>
				<Stack>
					<Text fontSize='xl' fontWeight='bold'>
						{client.clientName}
					</Text>
					<Box>
						<ClientBadge guid={client.guid} />
					</Box>
					<DescriptionText title='Бин/Иин:'>{client.clientBin}</DescriptionText>
					<DescriptionText title='Деятельность:'>{client.clientActivity}</DescriptionText>
					{children}
				</Stack>
			</CardBody>
		</Card>
	)
}
