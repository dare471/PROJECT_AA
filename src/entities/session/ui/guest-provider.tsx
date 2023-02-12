import { useUnit } from 'effector-react'
import { Navigate } from 'react-router'

import { routes } from '~src/shared/routes'

import * as model from '../model'

interface GuestProviderProps {
	children: React.ReactNode
}

export function GuestProvider(props: GuestProviderProps) {
	const [isAuth] = useUnit([model.$isAuth])

	if (isAuth) return <Navigate to={routes.home()} />

	return <>{props.children}</>
}
