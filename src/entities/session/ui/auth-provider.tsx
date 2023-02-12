import { useUnit } from 'effector-react'
import { Navigate } from 'react-router'

import { routes } from '~src/shared/routes'

import * as model from '../model'

interface AuthProviderProps {
	children: React.ReactNode
}

export function AuthProvider(props: AuthProviderProps) {
	const [isAuth] = useUnit([model.$isAuth])

	if (!isAuth) return <Navigate to={routes.signIn()} />

	return <>{props.children}</>
}
