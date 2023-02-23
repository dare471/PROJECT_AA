import { Center, chakra, Text } from '@chakra-ui/react'
import { BiCommentError } from 'react-icons/bi'

export const ErrorIcon = chakra(BiCommentError)

interface ErrorMessageProps {
	children: React.ReactNode
	icon?: React.ReactNode
}

export function ErrorMessage(props: ErrorMessageProps) {
	const { icon, children } = props

	return (
		<Center flexGrow='1' alignItems='center'>
			{icon ? <>{icon}</> : <ErrorIcon color='red' />}
			<Text color='red'>{children}</Text>
		</Center>
	)
}
