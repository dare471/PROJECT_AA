import { useAppDispatch, useAppSelector } from '@/7.shared/lib'
import { fetchSignIn, logout } from '../model/user'

export const useAuth = () => {
	const userToken = useAppSelector(state => state.user.userToken)
	const loading = useAppSelector(state => state.user.loading)
	const error = useAppSelector(state => state.user.error)
	const success = useAppSelector(state => state.user.success)
	const dispatch = useAppDispatch()

	const userSignIn = async (email: string, password: string) => {
		dispatch(fetchSignIn({ email, password }))
	}

	const userLogout = () => {
		dispatch(logout())
	}

	// const userSignUp = () => {

	// }

	return { isAuth: !!userToken, userSignIn, userLogout, error, loading, success }
}
