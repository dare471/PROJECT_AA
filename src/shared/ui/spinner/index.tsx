import { Center, Spinner } from '@chakra-ui/react'

interface FullSpinnerProps {
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export function FullSpinner(props: FullSpinnerProps) {
	const { size = 'xl' } = props
	return (
		<Center h='100vh'>
			<Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size={size} />
		</Center>
	)
}
