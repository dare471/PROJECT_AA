import {
	Box,
	Button,
	ButtonGroup,
	type ButtonProps,
	Container,
	Flex,
	Grid,
	Icon,
	Image,
	LinkBox,
	Text,
} from '@chakra-ui/react'
import { useUnit } from 'effector-react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { BsMap } from 'react-icons/bs'
import { useNavigate } from 'react-router'

import { $$session, SessionPanel, ShowOnly } from '~src/entities/session'

import { LogoImage } from '~src/shared/assets'
import { routes } from '~src/shared/routes'

export function Header() {
	const navigate = useNavigate()

	return (
		<Box bgColor='whiteAlpha.100' boxShadow='md' position='relative' zIndex='fixed'>
			<Container maxW='container.xl' h='4rem'>
				<Grid h='full' templateColumns={'1fr 1fr 1fr'}>
					<Flex justify='start' align='center'>
						<LinkBox cursor='pointer' onClick={() => navigate(routes.home())}>
							<Image src={LogoImage} alt='Логотип' fit='fill' h='10' />
						</LinkBox>
					</Flex>
					<Flex justify='center' align='center'>
						{/* <ButtonGroup>
						</ButtonGroup> */}
					</Flex>
					<Flex justify='end' align='center'>
						<ShowOnly when='guest'>
							<Button colorScheme='blue' onClick={() => navigate(routes.signIn())}>
								Войти
							</Button>
						</ShowOnly>

						<ShowOnly when='auth'>
							<ButtonGroup alignItems='center'>
								<Button variant='ghost' colorScheme='blue' onClick={() => navigate(routes.map())}>
									<Icon as={BsMap} />
								</Button>

								<ShowOnly whenRole='director'>
									<ClientCardIcon onClick={() => navigate(routes.favoriteClients())} />
								</ShowOnly>
								<SessionPanel />
							</ButtonGroup>
						</ShowOnly>
					</Flex>
				</Grid>
			</Container>
		</Box>
	)
}

function ClientCardIcon(props: ButtonProps) {
	const [session] = useUnit([$$session.$session])

	if (!session) return null

	return (
		<Button colorScheme='blue' position='relative' variant='ghost' {...props}>
			<Icon as={AiOutlineShoppingCart} boxSize='7' color='blue.500' />
			<Text
				position='absolute'
				top='50%'
				left='50%'
				color='white'
				transform='translateY(-100%) translateX(-100%)'
				fontSize='x-small'
				p='1'
				bgColor='blue.500'
				rounded='full'
			>
				{session.favoriteClients.length > 99 ? '99+' : session.favoriteClients.length}
			</Text>
		</Button>
	)
}
