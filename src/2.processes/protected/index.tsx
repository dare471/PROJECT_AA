import { FC } from 'react'
import { Navigate, useParams } from 'react-router'
import { routes } from '@/7.shared/config'
import { useAppSelector } from '@/7.shared/lib'

export const UserProtected =
	(Component: FC): FC =>
	props => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const { id } = useParams()
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const userId = useAppSelector(state => state.user.userId)

		return <>{id === userId ? <Component {...props} /> : <Navigate to={routes.error({})} />}</>
	}
