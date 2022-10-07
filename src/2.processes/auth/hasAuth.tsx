import { FC } from 'react'
import { Navigate, useLocation } from 'react-router'
import { useAuth } from '@/6.entities/user'
import { ROUTE_TO_MAP } from '@/7.shared/config'

export const HasAuth =
	(Component: FC): FC =>
	props => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const { isAuth } = useAuth()
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const { state } = useLocation()

		return <>{isAuth ? <Navigate to={state?.from || ROUTE_TO_MAP()} /> : <Component {...props} />}</>
	}
