import { createEvent, createStore } from 'effector'

export function createSignInForm() {
	const submitted = createEvent<void>()

	const emailFieldChange = createEvent<string>()
	const passwordFieldChange = createEvent<string>()

	const passwordVisibleClicked = createEvent<void>()

	const $emailField = createStore('')
	const $emailFieldError = createStore<string | null>(null)

	const $passwordField = createStore('')
	const $passwordFieldError = createStore<string | null>(null)
	const $passwordVisible = createStore(false)

	$emailField.on(emailFieldChange, (_, email) => email)
	$passwordField.on(passwordFieldChange, (_, password) => password)

	$emailFieldError.on($emailField, (error, email) => {
		if (!email) return 'Почта обязательна'
		if (!email.includes('@')) return 'Введите корректный email'
		return null
	})
	$passwordFieldError.on($passwordField, (error, password) => {
		if (!password) return 'Пароль обязателен'
		return null
	})

	$passwordVisible.on(passwordVisibleClicked, (visible) => !visible)

	return {
		submitted,
		emailFieldChange,
		passwordFieldChange,
		passwordVisibleClicked,
		$emailField,
		$emailFieldError,
		$passwordField,
		$passwordFieldError,
		$passwordVisible,
	}
}
