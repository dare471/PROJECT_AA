import { Card, CardBody, type CardProps, Grid, Stack, Text } from '@chakra-ui/react'

import { type UserMapHistory } from '~src/shared/api'
import { DescriptionText, Spin } from '~src/shared/ui'

import { type createUser } from '../model'

interface UserMapHistoryCardProps extends Partial<UserMapHistory>, Omit<CardProps, 'id' | 'onClick'> {
	index: number
	load?: { loading: boolean; loader?: React.ReactNode }
	onClick?: (args: { event: any; id: string; clientId: number; regionId: number; plotId: number }) => void
}

export function UserMapHistoryCard(props: UserMapHistoryCardProps) {
	const {
		index,
		id,
		userId,
		clientId,
		clientName,
		regionId,
		regionName,
		plotId,
		plotName,
		load,
		onClick,
		...otherProps
	} = props

	return (
		<Card {...otherProps}>
			<CardBody>
				<Stack>
					<DescriptionText title='Номер:'>{index}</DescriptionText>
					{clientName && (
						<Text fontSize='md' fontWeight='medium'>
							<DescriptionText title='Клиент:'>{clientName}</DescriptionText>
						</Text>
					)}
					{regionName && (
						<Text fontSize='md' fontWeight='medium'>
							<DescriptionText title='Область:'>{regionName}</DescriptionText>
						</Text>
					)}
					{plotName && (
						<Text fontSize='md' fontWeight='medium'>
							<DescriptionText title='Участок:'>{plotName}</DescriptionText>
						</Text>
					)}
				</Stack>
			</CardBody>

			{load && !load.loader ? <Spin /> : <>{load?.loader}</>}
		</Card>
	)
}
