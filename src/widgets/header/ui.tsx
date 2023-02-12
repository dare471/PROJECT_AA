import {
	Box,
	Button,
	ButtonGroup,
	Container,
	Flex,
	Grid,
	Icon,
	IconButton,
	Image,
	Link,
	LinkBox,
} from '@chakra-ui/react'
import { BsMap } from 'react-icons/bs'
import { useNavigate } from 'react-router'

import { SessionPanel } from '~src/entities/session'

import { LogoImage } from '~src/shared/assets'
import { routes } from '~src/shared/routes'

export function Header() {
	const navigate = useNavigate()

	return (
		<Box bgColor='whiteAlpha.100' boxShadow='md'>
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
						<ButtonGroup alignItems='center'>
							<Button variant='ghost'>
								<Icon as={BsMap} />
							</Button>
							<SessionPanel />
						</ButtonGroup>
					</Flex>
				</Grid>
			</Container>
		</Box>
	)
}
