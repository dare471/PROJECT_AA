import { useAppDispatch, useAppSelector } from '@/7.shared/lib/redux'

import { sessionModel } from '../model'

export const useAuth = () => {
	const userToken = useAppSelector(state => state.session.userToken)
	const loading = useAppSelector(state => state.session.loading)
	const error = useAppSelector(state => state.session.error)
	const success = useAppSelector(state => state.session.success)
	const dispatch = useAppDispatch()
	const isAuth = !!userToken

	const userSignIn = async (email: string, password: string) => {
		dispatch(sessionModel.fetchSignIn({ email, password }))
	}

	const userLogout = () => {
		dispatch(sessionModel.logout())
	}

	// const userSignUp = () => {
	// }

	return { isAuth, userSignIn, userLogout, error, loading, success }
}
