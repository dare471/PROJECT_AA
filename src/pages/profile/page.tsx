import { Box, Container } from '@chakra-ui/react'
import { useUnit } from 'effector-react'
import React from 'react'
import { useParams } from 'react-router'

import { Header } from '~src/widgets/header'

import { UserFactory } from '~src/entities/user'

import * as model from './model'

export function ProfilePage() {
	const [handleMount, handleUnmount] = useUnit([model.profilePageMounted, model.profilePageUnmounted])
	const { userId } = useParams<{ userId: string }>()

	React.useEffect(() => {
		handleMount({ userId: Number(userId) })
		return () => {
			handleUnmount()
		}
	}, [])

	return (
		<Box>
			<Header />
			<Container maxW='container.xl'>
				<User />
			</Container>
		</Box>
	)
}

function User() {
	const [user, userPending] = useUnit([model.$$user.$user, model.$$user.$userPending])

	return <UserFactory.UserCard load={{ loading: userPending }} {...user} />
}
