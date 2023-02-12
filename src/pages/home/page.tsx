import { Center, Container, Heading } from '@chakra-ui/react'

import { Header } from '~src/widgets/header'

export function HomePage() {
	return (
		<>
			<Header />
			<Container minH='calc(100vh - 4rem)'>
				<Center minH='inherit'>
					<Heading color='blue.500'>Welcome to AlemAgro</Heading>
				</Center>
			</Container>
		</>
	)
}
