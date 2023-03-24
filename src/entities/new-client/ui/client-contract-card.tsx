import { Badge, Card, CardBody, type CardProps, Stack, Text } from '@chakra-ui/react'

import { type ClientContract, type ClientLastContract } from '~src/shared/api'
import { DescriptionText, Spin } from '~src/shared/ui'

interface ClientContractCardProps
	extends Partial<ClientContract>,
		Pick<Partial<ClientLastContract>, 'deliveryAddress' | 'manager'>,
		Omit<CardProps, 'onClick' | 'id'> {
	load?: { loading: boolean; loader?: React.ReactNode }
	onClick?: (args: { event: any; contractId: number }) => void
}

export function ClientContractCard(props: ClientContractCardProps) {
	const {
		id,
		number,
		name,
		status,
		success,
		season,
		mainContract,
		managerContract,
		manager,
		additionalContract,
		conditionPay,
		sum,
		deliveryMethod,
		deliveryAddress,
		dateCreate,
		dateStart,
		dateEnd,
		load,
		onClick,
		...otherProps
	} = props

	function handleClick(event: any) {
		if (onClick && id) {
			onClick({ event, contractId: id })
		}
	}

	return (
		<Card onClick={handleClick} {...otherProps}>
			<CardBody>
				<Stack>
					{name && (
						<Text fontSize='xl' fontWeight='medium'>
							{name}
						</Text>
					)}
					{status && <Badge>{status}</Badge>}
					{number && <DescriptionText title='Номер договора:'>{number}</DescriptionText>}
					{success && <DescriptionText title='Успешность:'>{success}</DescriptionText>}
					{season && <DescriptionText title='Сезон:'>{season}</DescriptionText>}
					{mainContract && <DescriptionText title='Основной договор:'>{mainContract}</DescriptionText>}
					{manager && <DescriptionText title='Менеджер:'>{manager}</DescriptionText>}
					{managerContract && <DescriptionText title='Договор менеджера:'>{managerContract}</DescriptionText>}
					{additionalContract && (
						<DescriptionText title='Дополнительный договор:'>{additionalContract}</DescriptionText>
					)}
					{conditionPay && <DescriptionText title='Условия оплаты:'>{conditionPay}</DescriptionText>}
					{sum && <DescriptionText title='Сумма:'>{sum}</DescriptionText>}
					{deliveryAddress && <DescriptionText title='Адрес доставки:'>{deliveryAddress}</DescriptionText>}
					{deliveryMethod && <DescriptionText title='Способ доставки:'>{deliveryMethod}</DescriptionText>}
					{dateCreate && <DescriptionText title='Дата создания:'>{dateCreate}</DescriptionText>}
					{dateStart && <DescriptionText title='Дата начала:'>{dateStart}</DescriptionText>}
					{dateEnd && <DescriptionText title='Дата окончания:'>{dateEnd}</DescriptionText>}
				</Stack>
			</CardBody>

			{load && load.loading && <>{load.loader ? <>{load.loader}</> : <Spin />}</>}
		</Card>
	)
}
