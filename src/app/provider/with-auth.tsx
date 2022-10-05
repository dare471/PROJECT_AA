import { ReactNode, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { ROUTE_TO_LOGIN } from '../../shared/lib/paths'
import { useAuth } from '@/entities/user'

export const withAuth = (Component: any) => (props: any) => {
	const { isAuth } = useAuth()
	const location = useLocation()
	const navigate = useNavigate()

	useEffect(() => {
		if (!isAuth) {
			navigate(ROUTE_TO_LOGIN(), { state: { from: location } })
		}
	}, [isAuth])

	return <Component {...props} />
}
