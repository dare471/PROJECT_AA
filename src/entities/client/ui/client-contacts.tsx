import { Box, Card, CardBody, type CardProps, Center, Spinner, Stack, type StackProps, Text } from '@chakra-ui/react'
import { useUnit } from 'effector-react'

import { type ClientContact } from '~src/shared/api'
import { DescriptionText } from '~src/shared/ui'

import type { createClient } from '../model'
import { ContactBadge } from './contact-badge'

interface ClientContactsCardProps extends Omit<StackProps, 'title'> {
	model: ReturnType<typeof createClient>
}

export function ClientContacts(props: ClientContactsCardProps) {
	const { model, ...otherProps } = props
	const [contacts, contactsPending] = useUnit([model.$contacts, model.$clientPending])

	return (
		<Stack {...otherProps}>
			{contacts.length !== 0 && (
				<>
					{contacts.map((contact, index) => (
						<ClientContactCard key={index} contact={contact} />
					))}
				</>
			)}

			{!contactsPending && contacts.length === 0 && <Center flexGrow='1'>Нету контактов</Center>}
			{contactsPending && (
				<Center flexGrow='1'>
					<Spinner color='blue.500' />
				</Center>
			)}
		</Stack>
	)
}

interface ClientContactCardProps extends CardProps {
	contact: ClientContact
}

export function ClientContactCard(props: ClientContactCardProps) {
	const { contact, ...otherProps } = props

	return (
		<Card {...otherProps}>
			<CardBody>
				<Stack>
					<Text fontSize='xl' fontWeight='medium'>
						{contact.contactName}
					</Text>
					<Box>
						<ContactBadge active={contact.active} />
					</Box>
					<DescriptionText title='Номер телефона:'>{contact.contactPhone}</DescriptionText>
					<DescriptionText title='Почта:'>{contact.contactEmail}</DescriptionText>
					<DescriptionText title='Было обновлено:'>{contact.updateTime}</DescriptionText>
					<DescriptionText title='Автор обновления:'>{contact.updateAuthor}</DescriptionText>
					<DescriptionText title='Позиция автора:'>{contact.updateAuthorPosition}</DescriptionText>
				</Stack>
			</CardBody>
		</Card>
	)
}
