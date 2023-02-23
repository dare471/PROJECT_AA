import { Badge, Box, Card, CardBody, type CardProps, Center, Spinner, Stack, Text } from '@chakra-ui/react'

import { type ClientContract, type ClientLastContract } from '~src/shared/api'
import { DescriptionText } from '~src/shared/ui'

interface ClientContractCardProps extends CardProps {
	contract: ClientContract | null
	contractPending?: boolean
}

export function ClientContractCard(props: ClientContractCardProps) {
	const { contract, contractPending = false, ...otherProps } = props

	return (
		<Card {...otherProps}>
			{contract && (
				<CardBody>
					<Stack>
						<Text fontSize='xl' fontWeight='medium'>
							{contract.name}
						</Text>
						<Stack direction='row' flexWrap='wrap'>
							<Badge colorScheme='orange'>{contract.season}</Badge>
							<ContractBadge isActive={contract.success} />
							<Badge colorScheme='blue'>{contract.status}</Badge>
						</Stack>
						<DescriptionText title='Номер:'>{contract.number}</DescriptionText>
						<DescriptionText title='Сумма:'>{contract.sum}</DescriptionText>
						<DescriptionText title='Основной контракт:'>{contract.mainContract}</DescriptionText>
						<DescriptionText title='Контракт менеджера:'>{contract.managerContract}</DescriptionText>
						<DescriptionText title='Способ доставки:'>{contract.deliveryMethod}</DescriptionText>
					</Stack>
				</CardBody>
			)}
			{!contract && <Center flexGrow='1'>Нету данных</Center>}
			{contractPending && (
				<Center flexGrow='1'>
					<Spinner colorScheme='blue' />
				</Center>
			)}
		</Card>
	)
}

interface ClientLastContractCardProps extends CardProps {
	contract: ClientLastContract | null
	contractPending?: boolean
}

export function ClientLastContractCard(props: ClientLastContractCardProps) {
	const { contract, contractPending, ...otherProps } = props

	return (
		<Card {...otherProps}>
			{contract && (
				<CardBody>
					<Stack>
						<Stack direction='row' flexWrap='wrap'>
							<Badge colorScheme='orange'>{contract.season}</Badge>
							<Badge colorScheme='blue'>{contract.status}</Badge>
						</Stack>
						<DescriptionText title='Номер:'>{contract.number}</DescriptionText>
						<DescriptionText title='Клиент:'>{contract.client}</DescriptionText>
						<DescriptionText title='Менеджер:'>{contract.manager}</DescriptionText>
						<DescriptionText title='Сумма:'>{contract.sum}</DescriptionText>
						<DescriptionText title='Адрес:'>{contract.deliveryAddress}</DescriptionText>
						<DescriptionText title='Дата начала:'>{contract.dateStart}</DescriptionText>
						<DescriptionText title='Дата окончания:'>{contract.dateEnd}</DescriptionText>
					</Stack>
				</CardBody>
			)}
			{!contractPending && !contract && <Center flexGrow='1'>Нету последнего контракта</Center>}
			{contractPending && (
				<Center flexGrow='1'>
					<Spinner color='blue.500' />
				</Center>
			)}
		</Card>
	)
}

function ContractBadge(props: { isActive: boolean }) {
	const { isActive } = props
	return (
		<>{isActive ? <Badge colorScheme='green'>Завершенный</Badge> : <Badge colorScheme='red'>Не завершенный</Badge>}</>
	)
}
