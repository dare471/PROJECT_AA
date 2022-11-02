import { HasAuth } from '@/2.processes/auth/has-auth'
import { RequireAuth } from '@/2.processes/auth/require-auth'
import { MapRequireParams } from '@/2.processes/params/map'
import { UserProtected } from '@/2.processes/protected'

import { ERROR_ROUTE, HOME_ROUTE, MAP_ROUTE, PROFILE_ROUTE, SIGN_IN_ROUTE } from '@/7.shared/config'
import { namedLazy } from '@/7.shared/lib/hooks'

const ProfilePage = namedLazy(() => import('@/3.pages/profile'), 'ProfilePage')
const HomePage = namedLazy(() => import('@/3.pages/home'), 'HomePage')
const MapPage = namedLazy(() => import('@/3.pages/map'), 'MapPage')
const SignInPage = namedLazy(() => import('@/3.pages/auth/sign-in'), 'SignInPage')
const ErrorPage = namedLazy(() => import('@/3.pages/error'), 'ErrorPage')

export const publicRouteMap = {
	home: {
		path: HOME_ROUTE,
		element: HomePage
	},
	map: {
		path: MAP_ROUTE,
		element: RequireAuth(MapRequireParams(MapPage))
	},
	signIn: {
		path: SIGN_IN_ROUTE,
		element: HasAuth(SignInPage)
	},
	error: {
		path: ERROR_ROUTE,
		element: ErrorPage
	},
	profile: {
		path: PROFILE_ROUTE,
		element: UserProtected(RequireAuth(ProfilePage))
	}
}
