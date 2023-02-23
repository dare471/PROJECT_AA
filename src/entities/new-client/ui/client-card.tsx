import { Card, CardBody, type CardProps, Stack, Text } from '@chakra-ui/react'
import { type EffectState } from 'patronum/status'

import { type Client } from '~src/shared/api'
import { DescriptionText, ErrorMessage, Spin } from '~src/shared/ui'

import { ClientBadge } from './client-badge'

interface ClientCardProps extends Omit<Partial<Client>, 'clientContacts'>, Omit<CardProps, 'onClick'> {
	status?: EffectState
	loader?: React.ReactNode
	error?: { icon?: React.ReactNode; message?: string }
	onClick?: (args: { event: any; clientId: number }) => void
}

export function ClientCard(props: ClientCardProps) {
	const {
		guid,
		clientId,
		clientName,
		clientBin,
		clientAddress,
		clientActivity,
		clientCato,
		status = 'initial',
		loader,
		error,
		onClick,
		...otherProps
	} = props

	function handleClick(event: any) {
		if (onClick && clientId) {
			onClick({ event, clientId })
		}
	}

	return (
		<Card onClick={handleClick} {...otherProps}>
			{status === 'done' && (
				<CardBody>
					<Stack>
						{clientName && (
							<Text fontSize='xl' fontWeight='bold'>
								{clientName}
							</Text>
						)}
						{guid && <ClientBadge hasGuid={guid} />}
						{clientBin && <DescriptionText title='Иин/Бин:'>{clientBin}</DescriptionText>}
						{clientAddress && <DescriptionText title='Адрес:'>{clientAddress}</DescriptionText>}
						{clientActivity && <DescriptionText title='Вид деятельности:'>{clientActivity}</DescriptionText>}
						{clientCato && <DescriptionText title='Като:'>{clientCato}</DescriptionText>}
					</Stack>
				</CardBody>
			)}

			{status === 'pending' && <>{loader ? <Spin /> : { loader }}</>}

			{status === 'fail' && (
				<>
					{error && !error.icon ? (
						<ErrorMessage>{error.message ? error.message : 'Произошла ошибка'}</ErrorMessage>
					) : (
						<>{error?.icon}</>
					)}
				</>
			)}
		</Card>
	)
}
