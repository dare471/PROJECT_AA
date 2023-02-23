import {
	Avatar,
	Box,
	Card,
	CardBody,
	type CardProps,
	Center,
	Container,
	Flex,
	Grid,
	GridItem,
	Spinner,
	Stack,
	Text,
} from '@chakra-ui/react'
import { useUnit } from 'effector-react'
import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { useParams } from 'react-router'

import { Header } from '~src/widgets/header'

import { DescriptionText, Development } from '~src/shared/ui'

import * as model from './model'

export function UserProfilePage() {
	const [handleMount, handleUnmount] = useUnit([
		model.userPublicProfilePageMounted,
		model.userPublicProfilePageUnmounted,
	])

	const params = useParams()

	React.useEffect(() => {
		const userId = Number(params.userId)
		handleMount({ userId })

		return () => handleUnmount()
	}, [])

	return (
		<Box>
			<Header />
			<Container maxW='container.xl' minH='calc(100vh - 4rem)' py='15'>
				<Flex direction={{ base: 'column-reverse', md: 'row' }} minH='inherit' gap='5'>
					<Box
						w={{ base: 'full', md: '70%' }}
						minH='inherit'
						bgColor='whiteAlpha.300'
						rounded='md'
						boxShadow='md'
						px='4'
						py='5'
					>
						{/* <Development minH='inherit' /> */}
						<UserMapHistories />
					</Box>
					<Box maxH='lg' w={{ base: 'full', md: '30%' }}>
						<UserCard orientation='vertical' minH='lg' />
					</Box>
				</Flex>
			</Container>
		</Box>
	)
}

interface UserCardProps extends CardProps {
	orientation?: 'vertical' | 'horizontal'
}

function UserCard(props: UserCardProps) {
	const { orientation = 'vertical' } = props
	const [userInfo, userInfoPending] = useUnit([model.$$user.$user, model.$$user.$userPending])

	return (
		<Card minH='sm' {...props}>
			<CardBody minH='inherit' position='relative'>
				{userInfo && (
					<Flex direction={orientation === 'vertical' ? 'column' : 'row'} gap='10' align='center'>
						<Avatar as={FaUserCircle} w='full' h='full' maxW='3xs' maxH='3xs' />

						<Flex direction='column' gap='1'>
							<Text fontSize='3xl' fontWeight='bold' textAlign={orientation === 'vertical' ? 'center' : 'start'}>
								{userInfo.fullName ?? 'Нету'}
							</Text>
							<Grid
								templateRows={orientation === 'vertical' ? 'repeat(1fr, 5)' : 'repeat(1fr, 2)'}
								templateColumns={orientation === 'vertical' ? '1fr' : 'repeat(1fr, 3)'}
							>
								<GridItem>
									<Flex flexWrap='wrap' align='center' gap='1'>
										<Text fontSize='md' fontWeight='bold'>
											Почта:
										</Text>
										<Text fontSize='sm'>{userInfo.email ?? 'Нету'}</Text>
									</Flex>
								</GridItem>
								<GridItem>
									<Flex flexWrap='wrap' align='center' gap='1'>
										<Text fontSize='md' fontWeight='bold'>
											Отдел:
										</Text>
										<Text fontSize='sm'>{userInfo.direction ?? 'Нету'}</Text>
									</Flex>
								</GridItem>
								<GridItem>
									<Flex flexWrap='wrap' align='center' gap='1'>
										<Text fontSize='md' fontWeight='bold'>
											Като:
										</Text>
										<Text fontSize='sm'>{userInfo.crmCato ?? 'Нету'}</Text>
									</Flex>
								</GridItem>
								<GridItem>
									<Flex flexWrap='wrap' align='center' gap='1'>
										<Text fontSize='md' fontWeight='bold'>
											Позиция:
										</Text>
										<Text fontSize='sm'>{userInfo.position ?? 'Нету'}</Text>
									</Flex>
								</GridItem>
								<GridItem>
									<Flex flexWrap='wrap' align='center' gap='1'>
										<Text fontSize='md' fontWeight='bold'>
											Подразделение:
										</Text>
										<Text fontSize='sm'>{userInfo.subDivision ?? 'Нету'}</Text>
									</Flex>
								</GridItem>
							</Grid>
						</Flex>
					</Flex>
				)}

				{userInfoPending && (
					<Center position='absolute' top='50%' left='50%' transform='translateY(-50%) translateX(-50%)'>
						<Spinner />
					</Center>
				)}
			</CardBody>
		</Card>
	)
}

function UserMapHistories() {
	const [mapHistories, mapHistoriesPending] = useUnit([
		model.$$userMapHistories.$userMapHistories,
		model.$$userMapHistories.$userMapHistoriesPending,
	])

	if (mapHistoriesPending) {
		return (
			<Center flexGrow='1'>
				<Spinner colorScheme='blue' />
			</Center>
		)
	}

	return (
		<Stack>
			{mapHistories.map((mapHistory, index) => (
				<Card key={index} variant='elevated'>
					<CardBody minH='inherit' position='relative'>
						<Stack direction='row' flexWrap='wrap'>
							<DescriptionText title='Номер:'>{index}</DescriptionText>
							<DescriptionText title='Область:'>{mapHistory.regionName}</DescriptionText>
							<DescriptionText title='Клиент:'>{mapHistory.clientName}</DescriptionText>
							<DescriptionText title='Участок:'>{mapHistory.plotName}</DescriptionText>
						</Stack>
					</CardBody>
				</Card>
			))}
		</Stack>
	)
}
