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
	Text,
} from '@chakra-ui/react'
import { useUnit } from 'effector-react'
import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { useParams } from 'react-router'

import { Header } from '~src/widgets/header'

import { BlockDevelopment } from '~src/shared/ui'

import * as model from './model'

export function UserPublicProfilePage() {
	const [handleMount, handleUnmount] = useUnit([
		model.userPublicProfilePageMounted,
		model.userPublicProfilePageUnmounted,
	])

	const params = useParams()

	React.useEffect(() => {
		const userId = Number(params.userId)
		handleMount({ userId })
	}, [])

	return (
		<Box>
			<Header />
			<Container maxW='container.xl' minH='calc(100vh - 4rem)' py='15'>
				<UserCard orientation='horizontal' w='inherit' />
				<Grid minH='inherit' templateAreas={'"main aside"'} templateColumns={'1fr 350px'} gap='5'>
					<GridItem area='main' minH='inherit'>
						<Box minH='inherit' bgColor='whiteAlpha.300' rounded='md' boxShadow='md' px='4' py='5'>
							<BlockDevelopment minH='inherit' />
						</Box>
					</GridItem>
					<GridItem area='aside'>
						<></>
					</GridItem>
				</Grid>
			</Container>
		</Box>
	)
}

interface UserCardProps extends CardProps {
	orientation?: 'vertical' | 'horizontal'
}

function UserCard(props: UserCardProps) {
	const { orientation = 'vertical' } = props
	const [userInfo, userInfoPending] = useUnit([model.$userInfo, model.$userInfoPending])
	const direction = orientation === 'vertical' ? 'column' : 'row'
	const width = orientation === 'vertical' ? 'fit-content' : 'full'

	return (
		<Card minH='sm' w={width} {...props}>
			<CardBody minH='inherit' position='relative'>
				{userInfo && (
					<Flex direction='column' gap='1'>
						<Flex>
							<Avatar as={FaUserCircle} w='full' h='full' maxW='3xs' maxH='3xs' />
						</Flex>
						<Flex
							direction={direction}
							flexWrap='wrap'
							gap='1'
							align={orientation === 'vertical' ? 'center' : 'unset'}
							justify={orientation === 'vertical' ? 'center' : 'unset'}
						>
							<Text fontSize='3xl' fontWeight='bold'>
								{userInfo.fullName ?? 'Нету'}
							</Text>
						</Flex>
						<Flex flexWrap='wrap' align='center' gap='1'>
							<Text fontSize='md' fontWeight='bold'>
								Почта:
							</Text>
							<Text fontSize='sm'>{userInfo.email ?? 'Нету'}</Text>
						</Flex>
						<Flex flexWrap='wrap' align='center' gap='1'>
							<Text fontSize='md' fontWeight='bold'>
								Отдел:
							</Text>
							<Text fontSize='sm'>{userInfo.direction ?? 'Нету'}</Text>
						</Flex>
						<Flex flexWrap='wrap' align='center' gap='1'>
							<Text fontSize='md' fontWeight='bold'>
								Като:
							</Text>
							<Text fontSize='sm'>{userInfo.crmCato ?? 'Нету'}</Text>
						</Flex>
						<Flex flexWrap='wrap' align='center' gap='1'>
							<Text fontSize='md' fontWeight='bold'>
								Позиция:
							</Text>
							<Text fontSize='sm'>{userInfo.position ?? 'Нету'}</Text>
						</Flex>
						<Flex flexWrap='wrap' align='center' gap='1'>
							<Text fontSize='md' fontWeight='bold'>
								Подразделение:
							</Text>
							<Text fontSize='sm'>{userInfo.subDivision ?? 'Нету'}</Text>
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
