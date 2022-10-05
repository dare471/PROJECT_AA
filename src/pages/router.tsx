import { useRoutes } from 'react-router'
import { Page404 } from '@/pages/404'
import { HOME_ROUTE, LOGIN_ROUTE, MAP_ROUTE, PAGE404_ROUTE } from '@/shared/config'
import { namedLazy } from '@/shared/lib'
import { MainTemplate } from '../widgets/template'

const HomePage = namedLazy(() => import('@/pages/home'), 'HomePage')
const MapPage = namedLazy(() => import('@/pages/map'), 'MapPage')
const LoginPage = namedLazy(() => import('@/pages/sign-in'), 'SignInPage')

export const PublicRouter = () => {
	return useRoutes([
		{
			element: <MainTemplate />,
			children: [
				{
					path: HOME_ROUTE,
					element: <HomePage />
				},
				{
					path: LOGIN_ROUTE,
					element: <LoginPage />
				},
				{
					path: MAP_ROUTE,
					element: <MapPage />
				}
			]
		},
		{
			path: PAGE404_ROUTE,
			element: <Page404 />
		}
	])
}
