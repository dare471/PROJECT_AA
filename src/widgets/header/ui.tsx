import { Box, Button, ButtonGroup, Container, Flex, Grid, Icon, Image, LinkBox } from '@chakra-ui/react'
import { BsMap } from 'react-icons/bs'
import { useNavigate } from 'react-router'

import { SessionPanel, ShowOnly } from '~src/entities/session'

import { LogoImage } from '~src/shared/assets'
import { zIndices } from '~src/shared/lib'
import { routes } from '~src/shared/routes'

export function Header() {
	const navigate = useNavigate()

	return (
		<Box bgColor='whiteAlpha.100' boxShadow='md' position='relative' zIndex={zIndices.header}>
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
								<SessionPanel />
							</ButtonGroup>
						</ShowOnly>
					</Flex>
				</Grid>
			</Container>
		</Box>
	)
}
