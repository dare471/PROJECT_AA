import { useUnit } from 'effector-react'
import { Navigate } from 'react-router'

import { routes } from '~src/shared/routes'

import * as model from '../model'

interface AuthProtectProps {
	children: React.ReactNode
}

export function AuthProtect(props: AuthProtectProps) {
	const [isAuth] = useUnit([model.$isAuth])

	if (!isAuth) return <Navigate to={routes.signIn()} />

	return <>{props.children}</>
}
