export const kek = ''
// import { Avatar, Card, CardBody, type CardProps, Center, Flex, Grid, GridItem, Spinner, Text } from '@chakra-ui/react'
// import { useUnit } from 'effector-react'
// import { FaUserCircle } from 'react-icons/fa'

// import { DescriptionText } from '~src/shared/ui'

// import type { createUserInfo } from '../model'

// interface UserInfoCardProps extends CardProps {
// 	model: ReturnType<typeof createUserInfo>
// 	orientation: 'vertical' | 'horizontal'
// }

// export function UserInfoCard(props: UserInfoCardProps) {
// 	const { model, orientation = 'vertical' } = props
// 	const [userInfo, userInfoPending] = useUnit([model.$userInfo, model.$userInfoPending])

// 	return (
// 		<Card position='relative' minH='sm' {...props}>
// 			{userInfo && (
// 				<CardBody>
// 					<Flex direction={orientation === 'vertical' ? 'column' : 'row'} gap='10' align='center'>
// 						<Avatar as={FaUserCircle} w='full' h='full' maxW='3xs' maxH='3xs' />

// 						<Flex direction='column' gap='1'>
// 							<Text fontSize='3xl' fontWeight='bold' textAlign={orientation === 'vertical' ? 'center' : 'start'}>
// 								{userInfo.userFullName ?? 'Нету'}
// 							</Text>
// 							<Grid
// 								templateRows={orientation === 'vertical' ? 'repeat(1fr, 5)' : 'repeat(1fr, 2)'}
// 								templateColumns={orientation === 'vertical' ? '1fr' : 'repeat(1fr, 3)'}
// 							>
// 								<GridItem>
// 									<DescriptionText title='Почта:'>{userInfo.userEmail ?? 'Нету'}</DescriptionText>
// 								</GridItem>
// 								<GridItem>
// 									<DescriptionText title='Отдел:'>{userInfo.userDirection ?? 'Нету'}</DescriptionText>
// 								</GridItem>
// 								<GridItem>
// 									<DescriptionText title='Позиция:'>{userInfo.userPosition ?? 'Нету'}</DescriptionText>
// 								</GridItem>
// 								<GridItem>
// 									<DescriptionText title='Подразделение:'>{userInfo.subDivision ?? 'Нету'}</DescriptionText>
// 								</GridItem>
// 								<GridItem>
// 									<DescriptionText title='Като:'>{userInfo.crmCato ?? 'Нету'}</DescriptionText>
// 								</GridItem>
// 							</Grid>
// 						</Flex>
// 					</Flex>
// 				</CardBody>
// 			)}
// 			{userInfoPending && (
// 				<Center>
// 					<Spinner />
// 				</Center>
// 			)}
// 		</Card>
// 	)
// }
