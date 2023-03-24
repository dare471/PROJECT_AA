import { useStore } from 'effector-react'
import { Navigate } from 'react-router'

import { routes } from '~src/shared/routes'

import * as model from '../model'

interface RoleProtectProps {
	children: React.ReactNode
	whenRole: 'director' | 'manager'
}

export function RoleProtect(props: RoleProtectProps) {
	const { whenRole, children } = props
	const role = useStore(model.$role)

	if (whenRole === 'director' && role.includes(1)) {
		return <>{children}</>
	} else if (whenRole === 'manager' && role.includes(0)) {
		return <>{children}</>
	}

	return <Navigate to={routes.error()} />
}
