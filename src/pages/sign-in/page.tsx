import { Box, Container, Heading, Stack } from '@chakra-ui/react'
import { useUnit } from 'effector-react'
import React from 'react'

import { Header } from '~src/widgets/header'

import { SignInFormFactory } from '~src/features/sign-in-form'

import * as model from './model'

export function SignInPage() {
	const [handleMount, handleUnmount] = useUnit([model.signInPageMounted, model.signInPageUnmounted])

	React.useEffect(() => {
		handleMount()

		return () => {
			handleUnmount()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<Box>
			<Header />
			<Container maxW='sm' minH='calc(100vh - 4rem)'>
				<Box pt='56' pb='52'>
					<Stack spacing='24'>
						<Heading textAlign='center' size='2xl' color='blue.500'>
							Вход
						</Heading>
						<SignInFormFactory.SignInForm model={model.signInFormModel} />
					</Stack>
				</Box>
			</Container>
		</Box>
	)
}
