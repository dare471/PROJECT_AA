import { createEvent, sample } from 'effector'

import { SignInFormFactory } from '~src/features/sign-in-form'

import { sessionModel } from '~src/entities/session'

export const signInPageMounted = createEvent<void>()
export const signInPageUnmounted = createEvent<void>()

export const signInFormModel = SignInFormFactory.createSignInForm()

sample({
	clock: signInFormModel.submitted,
	source: {
		email: signInFormModel.$emailField,
		emailError: signInFormModel.$emailFieldError,
		password: signInFormModel.$passwordField,
		passwordError: signInFormModel.$passwordFieldError,
	},
	filter: ({ emailError, passwordError }) => !emailError && !passwordError,
	target: [sessionModel.signInFx],
})

sample({
	clock: sessionModel.signInFx.fail,
	fn: () => 'Неправильный email',
	target: signInFormModel.$emailFieldError,
})

sample({
	clock: sessionModel.signInFx.fail,
	fn: () => 'Неправильный пароль',
	target: signInFormModel.$passwordFieldError,
})

sample({
	clock: signInPageUnmounted,
	target: [
		signInFormModel.$emailField.reinit!,
		signInFormModel.$passwordField.reinit!,
		signInFormModel.$emailFieldError.reinit!,
		signInFormModel.$passwordFieldError.reinit!,
	],
})
