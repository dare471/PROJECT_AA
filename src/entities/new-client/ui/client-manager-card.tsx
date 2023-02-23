import { Card, CardBody, type CardProps, Stack, Text } from '@chakra-ui/react'
import { type EffectState } from 'patronum/status'

import { type ClientManager } from '~src/shared/api'
import { DescriptionText, ErrorMessage, Spin } from '~src/shared/ui'

interface ClientManagerCardProps extends ClientManager, Omit<CardProps, 'onClick' | 'id' | 'position' | 'direction'> {
	status?: EffectState
	loader?: React.ReactNode
	error?: { icon?: React.ReactNode; message?: string }
	onClick?: (args: { event: any; clientId: number }) => void
}

export function ClientManagerCard(props: ClientManagerCardProps) {
	const { id, name, direction, position, season, status = 'initial', loader, error, onClick, ...otherProps } = props

	function handleClick(event: any) {
		if (onClick && id) {
			onClick({ event, clientId: id })
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
						{direction && <DescriptionText title='Направление:'>{direction}</DescriptionText>}
						{position && <DescriptionText title='Должность:'>{position}</DescriptionText>}
						{season && <DescriptionText title='Сезон:'>{season}</DescriptionText>}
					</Stack>
				</CardBody>
			)}
			{status === 'pending' && <>{loader ? <Spin /> : { loader }}</>}
			{status === 'fail' && error && <ErrorMessage icon={error.icon}>{error.message}</ErrorMessage>}
		</Card>
	)
}
