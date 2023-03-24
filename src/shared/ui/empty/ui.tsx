import { Center, Icon } from '@chakra-ui/react'
import { AiOutlineClear } from 'react-icons/ai'

interface EmptyProps {
	children?: React.ReactNode
}

export function Empty(props: EmptyProps) {
	const { children } = props

	return (
		<Center w='full' h='full' p={{ base: 10, md: 20 }} flexGrow='1' alignItems='center' gap='2'>
			<Icon as={AiOutlineClear} w='2rem' h='2rem' color='gray.500' />
			{children}
		</Center>
	)
}
