import { Center, Spinner, Stack, type StackProps } from '@chakra-ui/react'
import { useUnit } from 'effector-react'

import { type createClients } from '../model'
import { ClientShortCard } from './client-card'

interface ClientsProps extends StackProps {
	model: ReturnType<typeof createClients>
}

export function Clients(props: ClientsProps) {
	const { model, ...otherProps } = props
	const [clients, clientsPending] = useUnit([model.$clients, model.$clientsPending])

	if (clientsPending) {
		return (
			<Center>
				<Spinner />
			</Center>
		)
	}

	return (
		<Stack {...otherProps}>
			{clients.length !== 0 ? (
				<>
					{clients.map((client, index) => (
						<ClientShortCard key={index} client={client} />
					))}
				</>
			) : (
				<Center>Пусто</Center>
			)}
		</Stack>
	)
}
