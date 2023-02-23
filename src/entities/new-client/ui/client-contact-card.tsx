import { Card, CardBody, type CardProps, Stack, Text } from '@chakra-ui/react'
import { type EffectState } from 'patronum/status'

import { type ClientContact } from '~src/shared/api'
import { DescriptionText, ErrorMessage, Spin } from '~src/shared/ui'

import { ClientContactBadge } from './client-contact-badge'

interface ClientContactCardProps extends Partial<ClientContact>, Omit<CardProps, 'onClick'> {
	status?: EffectState
	loader?: React.ReactNode
	error?: { icon?: React.ReactNode; message?: string }
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
		status = 'initial',
		loader,
		error,
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
			{status === 'done' && (
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
