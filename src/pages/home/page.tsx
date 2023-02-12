import { Box, Button, Center, Container, Flex, Heading } from '@chakra-ui/react'
import { useNavigate } from 'react-router'

import { Header } from '~src/widgets/header'

import { HeroImage } from '~src/shared/assets'
import { routes } from '~src/shared/routes'

export function HomePage() {
	const navigate = useNavigate()

	return (
		<Box>
			<Header />
			<Container
				minW='full'
				minH='calc(100vh - 4rem)'
				bgImage={HeroImage}
				bgPosition='center'
				bgRepeat='no-repeat'
				bgSize='cover'
				bgBlendMode='overlay'
			>
				<Flex minH='inherit' h='full' direction='column' justify='space-between' align='center' py='40'>
					<Box bgColor='whiteAlpha.900' h='fit-content' p='4' rounded='md'>
						<Heading size='3xl' bgImage='linear-gradient(60deg, #006eb7, #00c4ba)' bgClip='text' color='transparent'>
							Добро полжаловать в AlemAgro
						</Heading>
					</Box>
					<Button bgColor='whiteAlpha.900' size='lg' onClick={() => navigate(routes.map())}>
						Начать знакомство
					</Button>
				</Flex>
			</Container>
		</Box>
	)
}
