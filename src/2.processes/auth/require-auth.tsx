import { FC } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { useAuth } from '@/6.entities/session'

import { routes } from '@/7.shared/config'

export const RequireAuth =
	(Component: FC): FC =>
	props => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const { isAuth } = useAuth()
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const location = useLocation()

		return <>{isAuth ? <Component {...props} /> : <Navigate to={routes.signIn({})} state={{ from: location }} />}</>
	}
