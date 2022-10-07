import { HasAuth } from '@/2.processes/auth/hasAuth'
import { RequireAuth } from '@/2.processes/auth/require-auth'
import { MapRequireParams } from '@/2.processes/map-params'
import { ERROR_ROUTE, HOME_ROUTE, MAP_ROUTE, SIGN_IN_ROUTE } from '@/7.shared/config'
import { namedLazy } from '@/7.shared/lib'

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
	}
}
