import { Center, type CenterProps, Icon, Text } from '@chakra-ui/react'
import { IoMdConstruct } from 'react-icons/io'

type BlockDevelopmentProps = CenterProps

export function BlockDevelopment(props: BlockDevelopmentProps) {
	return (
		<Center gap='2' {...props}>
			<Icon as={IoMdConstruct} fontSize='3xl' />
			<Text fontSize='2xl' fontWeight='medium'>
				...В разработке
			</Text>
		</Center>
	)
}
