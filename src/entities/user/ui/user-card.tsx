import { Avatar, Card, CardBody, type CardProps, Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import { FaUserCircle } from 'react-icons/fa'

import { type User } from '~src/shared/api'
import { DescriptionText, Spin } from '~src/shared/ui'

interface UserCardProps extends Partial<User>, Omit<CardProps, 'id' | 'direction' | 'position'> {
	load?: { loading: boolean; loader?: React.ReactNode }
	orientation?: 'vertical' | 'horizontal'
}

export function UserCard(props: UserCardProps) {
	const {
		id,
		guid,
		telegramId,
		fullName,
		direction,
		position,
		email,
		subDivision,
		crmCato,
		orientation = 'vertical',
		load,
		...otherProps
	} = props

	return (
		<Card {...otherProps}>
			<CardBody minH='inherit' position='relative'>
				<Flex direction={orientation === 'vertical' ? 'column' : 'row'} gap='10' align='center'>
					<Avatar as={FaUserCircle} w='full' h='full' maxW='3xs' maxH='3xs' />

					<Flex direction='column' gap='1'>
						<Text fontSize='3xl' fontWeight='bold' textAlign={orientation === 'vertical' ? 'center' : 'start'}>
							{fullName ?? 'Нету'}
						</Text>
						<Grid
							templateRows={orientation === 'vertical' ? 'repeat(1fr, 5)' : 'repeat(1fr, 2)'}
							templateColumns={orientation === 'vertical' ? '1fr' : 'repeat(1fr, 3)'}
						>
							<GridItem>
								<Flex flexWrap='wrap' align='center' gap='1'>
									<DescriptionText title='Почта:'>{email ?? 'Нету'}</DescriptionText>
								</Flex>
							</GridItem>
							<GridItem>
								<Flex flexWrap='wrap' align='center' gap='1'>
									<DescriptionText title='Отдел:'>{direction ?? 'Нету'}</DescriptionText>
								</Flex>
							</GridItem>
							<GridItem>
								<Flex flexWrap='wrap' align='center' gap='1'>
									<DescriptionText title='Като:'>{crmCato ?? 'Нету'}</DescriptionText>
								</Flex>
							</GridItem>
							<GridItem>
								<Flex flexWrap='wrap' align='center' gap='1'>
									<DescriptionText title='Позиция:'>{position ?? 'Нету'}</DescriptionText>
								</Flex>
							</GridItem>
							<GridItem>
								<Flex flexWrap='wrap' align='center' gap='1'>
									<DescriptionText title='Подразделение:'>{subDivision ?? 'Нету'}</DescriptionText>
								</Flex>
							</GridItem>
						</Grid>
					</Flex>
				</Flex>

				{load && !load.loader ? <>{load.loading && <Spin />}</> : <>{load?.loader}</>}
			</CardBody>
		</Card>
	)
}
