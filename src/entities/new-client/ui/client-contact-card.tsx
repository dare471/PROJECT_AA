import { Card, CardBody, type CardProps, Stack, Text } from '@chakra-ui/react'

import { type ClientContact } from '~src/shared/api'
import { DescriptionText, Spin } from '~src/shared/ui'

import { ClientContactBadge } from './client-contact-badge'

interface ClientContactCardProps extends Partial<ClientContact>, Omit<CardProps, 'onClick'> {
	load?: { loading: boolean; loader?: React.ReactNode }
	onClick?: (args: { event: any; clientId: number; contactId: number }) => void
}

export function ClientContactCard(props: ClientContactCardProps) {
	const {
		active,
		clientId,
		contactId,
		contactName,
		contactPhone,
		contactEmail,
		updateTime,
		updateAuthor,
		updateAuthorPosition,
		load,
		onClick,
		...otherProps
	} = props

	function handleClick(event: any) {
		if (onClick && clientId && contactId) {
			onClick({ event, clientId, contactId })
		}
	}

	return (
		<Card onClick={handleClick} {...otherProps}>
			<CardBody>
				<Stack>
					{typeof active !== 'undefined' && <ClientContactBadge isActive={active} />}
					{contactName && (
						<Text fontSize='xl' fontWeight='medium'>
							{contactName}
						</Text>
					)}
					{contactPhone && <DescriptionText title='Телефон:'>{contactPhone}</DescriptionText>}
					{contactEmail && <DescriptionText title='Email:'>{contactEmail}</DescriptionText>}
					{updateTime && <DescriptionText title='Дата обновления:'>{updateTime}</DescriptionText>}
					{updateAuthor && <DescriptionText title='Автор обновления:'>{updateAuthor}</DescriptionText>}
					{updateAuthorPosition && (
						<DescriptionText title='Должность автора обновления:'>{updateAuthorPosition}</DescriptionText>
					)}
				</Stack>
			</CardBody>

			{load && load.loading && <>{load.loader ? <>{load.loader}</> : <Spin />}</>}
		</Card>
	)
}
