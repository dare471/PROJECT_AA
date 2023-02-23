import { Center, type CenterProps, Icon, Text } from '@chakra-ui/react'
import { IoMdConstruct } from 'react-icons/io'

type DevelopmentProps = CenterProps

export function Development(props: DevelopmentProps) {
	return (
		<Center gap='2' {...props}>
			<Icon as={IoMdConstruct} fontSize='3xl' />
			<Text fontSize='2xl' fontWeight='medium'>
				...В разработке
			</Text>
		</Center>
	)
}
