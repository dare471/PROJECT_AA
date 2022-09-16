import { namedLazy } from './lib/named-lazy'


import { HOME_ROUTE, MAP_ROUTE } from './lib'
import { PAGE404_ROUTE } from './lib/paths'
import { Page404 } from '@/pages/404'
const MapPage = namedLazy(() => import('@/pages/map'), 'MapPage')
const HomePage = namedLazy(() => import('@/pages/home'), 'HomePage')

export const publicRoutes = [
	{
		path: HOME_ROUTE,
		Component: HomePage
	},
	{
		path: MAP_ROUTE,
		Component: MapPage
	},
	{
		path: PAGE404_ROUTE,
		Component: Page404
	}
]
