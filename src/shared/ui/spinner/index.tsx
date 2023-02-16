import { Center, Spinner } from '@chakra-ui/react'

interface FullSpinnerProps {
	h: 'window' | 'full' | 'auto'
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export function FullSpinner(props: FullSpinnerProps) {
	const { h = 'window', size = 'xl' } = props
	return (
		<Center h={h === 'window' ? '100vh' : h === 'full' ? 'full' : h === 'auto' ? 'auto' : 'unset'}>
			<Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size={size} />
		</Center>
	)
}

export function OverlaySpinner() {
	return (
		<Center w='full' h='full' position='absolute' top='0' left='0' zIndex='sticky' bgColor='blackAlpha.400'>
			<FullSpinner h='full' />
		</Center>
	)
}
