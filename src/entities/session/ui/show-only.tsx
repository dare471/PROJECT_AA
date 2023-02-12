import { useUnit } from 'effector-react'

import * as model from '../model'

interface ShowOnlyProps {
	children: React.ReactNode
	whenRole?: 'admin' | 'user'
	when?: 'auth' | 'guest'
}

export function ShowOnly(props: ShowOnlyProps) {
	const { whenRole, when } = props
	if (whenRole && when) throw new Error('ShowOnly: only one of "whenRole" or "when" props should be passed')

	const [isAuth, role] = useUnit([model.$isAuth, model.$role])

	if (when === 'auth' && !isAuth) return null
	if (when === 'guest' && isAuth) return null

	if (whenRole === 'admin' && !role.includes(1)) return null
	if (whenRole === 'user' && !role.includes(0)) return null

	return <>{props.children}</>
}
