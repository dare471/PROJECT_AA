import { Button, type ButtonProps } from '@chakra-ui/react'
import { useUnit } from 'effector-react'

import * as model from '../model'

interface SignInButtonProps extends ButtonProps {
	children?: React.ReactNode
}

export function SignInButton(props: SignInButtonProps) {
	const [isPending] = useUnit([model.$sessionPending])

	return (
		<Button isLoading={isPending} {...props}>
			{props.children ?? 'Войти'}
		</Button>
	)
}
