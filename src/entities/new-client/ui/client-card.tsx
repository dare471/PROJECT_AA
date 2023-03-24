import { Box, Card, CardBody, CardFooter, CardHeader, type CardProps, Stack, Text } from '@chakra-ui/react'

import { type Client } from '~src/shared/api'
import { DescriptionText, Spin } from '~src/shared/ui'

import { ClientBadge } from './client-badge'

interface ClientCardProps extends Omit<Partial<Client>, 'clientContacts'>, Omit<CardProps, 'onClick'> {
	children?: React.ReactNode
	load?: { loading: boolean; loader?: React.ReactNode }
	onClick?: (args: { event: any; clientId: number }) => void
	header?: React.ReactNode
	footer?: React.ReactNode
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
		load,
		onClick,
		header,
		footer,
		children,
		...otherProps
	} = props

	function handleClick(event: any) {
		if (onClick && clientId) {
			onClick({ event, clientId })
		}
	}

	return (
		<Card onClick={handleClick} {...otherProps}>
			{header && <CardHeader>{header}</CardHeader>}
			<CardBody>
				<Stack>
					{clientName && (
						<Text fontSize='xl' fontWeight='bold'>
							{clientName}
						</Text>
					)}
					{typeof guid === 'boolean' && (
						<Box>
							<ClientBadge hasGuid={guid} />
						</Box>
					)}
					{!!clientBin && <DescriptionText title='Иин/Бин:'>{clientBin}</DescriptionText>}
					{!!clientAddress && <DescriptionText title='Адрес:'>{clientAddress}</DescriptionText>}
					{!!clientActivity && <DescriptionText title='Вид деятельности:'>{clientActivity}</DescriptionText>}
					{!!clientCato && <DescriptionText title='Като:'>{clientCato}</DescriptionText>}
					{children}
				</Stack>
			</CardBody>
			{footer && <CardFooter>{footer}</CardFooter>}

			{load && load.loading && <>{load.loader ? <>{load.loader}</> : <Spin />}</>}
		</Card>
	)
}
