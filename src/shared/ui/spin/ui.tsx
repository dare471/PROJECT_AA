import { Center, Spinner } from '@chakra-ui/react'

// TODO: Add props to customize the spinner
export function Spin() {
	return (
		<Center flexGrow='1'>
			<Spinner />
		</Center>
	)
}
