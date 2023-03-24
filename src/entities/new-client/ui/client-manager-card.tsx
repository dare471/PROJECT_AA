import { Card, CardBody, type CardProps, Stack, Text } from '@chakra-ui/react'

import { type ClientManager } from '~src/shared/api'
import { DescriptionText, Spin } from '~src/shared/ui'

interface ClientManagerCardProps extends ClientManager, Omit<CardProps, 'onClick' | 'id' | 'position' | 'direction'> {
	load?: { loading: boolean; loader?: React.ReactNode }
	onClick?: (args: { event: any; clientId: number }) => void
}

export function ClientManagerCard(props: ClientManagerCardProps) {
	const { id, name, direction, position, season, load, onClick, ...otherProps } = props

	function handleClick(event: any) {
		if (onClick && id) {
			onClick({ event, clientId: id })
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
					{direction && <DescriptionText title='Направление:'>{direction}</DescriptionText>}
					{position && <DescriptionText title='Должность:'>{position}</DescriptionText>}
					{season && <DescriptionText title='Сезон:'>{season}</DescriptionText>}
				</Stack>
			</CardBody>

			{load && load.loading && <>{load.loader ? <>{load.loader}</> : <Spin />}</>}
		</Card>
	)
}
