import {
	Badge,
	Box,
	Card,
	CardBody,
	type CardProps,
	Center,
	Spinner,
	Stack,
	type StackProps,
	Text,
} from '@chakra-ui/react'
import { useUnit } from 'effector-react'

import type { ClientManager } from '~src/shared/api'
import { DescriptionText } from '~src/shared/ui'

import type { createClientManagers } from '../model'

interface ClientManagersProps extends StackProps {
	model: ReturnType<typeof createClientManagers>
}

export function ClientManagers(props: ClientManagersProps) {
	const { model, ...otherProps } = props
	const [managers, managersPending] = useUnit([model.$clientManagers, model.$clientMangersPending])

	return (
		<Stack {...otherProps}>
			{managers.length !== 0 && (
				<>
					{managers.map((manager, index) => (
						<ClientManagerCard key={index} manager={manager} />
					))}
				</>
			)}

			{!managersPending && managers.length === 0 && <Center flexGrow='1'>Нет менеджеров</Center>}
			{managersPending && (
				<Center flexGrow='1'>
					<Spinner color='blue.500' />
				</Center>
			)}
		</Stack>
	)
}

interface ClientManagerCardProps extends CardProps {
	manager: ClientManager
}

export function ClientManagerCard(props: ClientManagerCardProps) {
	const { manager, ...otherProps } = props

	return (
		<Card {...otherProps}>
			<CardBody>
				<Text fontSize='md' fontWeight='medium'>
					{manager.name}
				</Text>
				<Box>
					<Badge colorScheme='orange'>{manager.season}</Badge>
				</Box>
				<DescriptionText title='Позиция:'>{manager.position}</DescriptionText>
				<DescriptionText title='Директория:'>{manager.direction}</DescriptionText>
			</CardBody>
		</Card>
	)
}
