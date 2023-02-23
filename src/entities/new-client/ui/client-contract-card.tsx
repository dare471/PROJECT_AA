import { Badge, Card, CardBody, type CardProps, Stack, Text } from '@chakra-ui/react'
import { type EffectState } from 'patronum/status'

import { type ClientContract, type ClientLastContract } from '~src/shared/api'
import { DescriptionText, ErrorMessage, Spin } from '~src/shared/ui'

interface ClientContractCardProps
	extends Omit<Partial<ClientContract>, 'status'>,
		Pick<Partial<ClientLastContract>, 'deliveryAddress' | 'manager'>,
		Omit<CardProps, 'onClick' | 'id'> {
	contractStatus?: ClientContract['status']
	status?: EffectState
	loader?: React.ReactNode
	error?: { icon?: React.ReactNode; message?: string }
	onClick?: (args: { event: any; contractId: number }) => void
}

export function ClientContractCard(props: ClientContractCardProps) {
	const {
		id,
		number,
		name,
		contractStatus,
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
		status = 'initial',
		loader,
		error,
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
			{status === 'done' && (
				<CardBody>
					<Stack>
						{name && (
							<Text fontSize='xl' fontWeight='medium'>
								{name}
							</Text>
						)}
						{contractStatus && <Badge>{contractStatus}</Badge>}
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
			)}
			{status === 'pending' && <>{loader ? <Spin /> : { loader }}</>}
			{status === 'fail' && (
				<>
					{error && !error.icon ? <ErrorMessage icon={error.icon}>{error.message}</ErrorMessage> : <>{error?.icon}</>}
				</>
			)}
		</Card>
	)
}
