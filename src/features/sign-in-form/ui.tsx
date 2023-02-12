import { ViewIcon, ViewOffIcon, WarningIcon } from '@chakra-ui/icons'
import { Center, FormControl, IconButton, Input, InputGroup, InputRightElement, Stack, Text } from '@chakra-ui/react'
import { useUnit } from 'effector-react'

import { SignInButton } from '~src/entities/session'

import { type createSignInForm } from './model'

interface SignInFormProps {
	model: ReturnType<typeof createSignInForm>
}

export function SignInForm(props: SignInFormProps) {
	const { model } = props

	const [handleSubmit] = useUnit([model.submitted])
	const [email, emailError, handleEmailChange] = useUnit([
		model.$emailField,
		model.$emailFieldError,
		model.emailFieldChange,
	])
	const [password, passwordError, handlePasswordChanged] = useUnit([
		model.$passwordField,
		model.$passwordFieldError,
		model.passwordFieldChange,
	])
	const [passwordVisible, handlePasswordVisibleClick] = useUnit([model.$passwordVisible, model.passwordVisibleClicked])

	return (
		<FormControl>
			<Stack>
				<Stack>
					<Input type='email' value={email} onChange={(e) => handleEmailChange(e.target.value)} />
					{emailError && (
						<Center justifyContent='start' gap='1'>
							<WarningIcon color='red' />
							<Text color='red'>{emailError}</Text>
						</Center>
					)}
				</Stack>
				<Stack>
					<InputGroup>
						<Input
							type={passwordVisible ? 'text' : 'password'}
							value={password}
							onChange={(e) => handlePasswordChanged(e.target.value)}
						/>
						<InputRightElement>
							{passwordVisible ? (
								<IconButton aria-label='' icon={<ViewOffIcon />} onClick={handlePasswordVisibleClick} />
							) : (
								<IconButton aria-label='' icon={<ViewIcon />} onClick={handlePasswordVisibleClick} />
							)}
						</InputRightElement>
					</InputGroup>
					{passwordError && (
						<Center justifyContent='start' gap='1'>
							<WarningIcon color='red' />
							<Text color='red'>{passwordError}</Text>
						</Center>
					)}
				</Stack>
				<SignInButton type='submit' onClick={() => handleSubmit()} />
			</Stack>
		</FormControl>
	)
}
