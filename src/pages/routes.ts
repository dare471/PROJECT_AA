import { lazy } from '~src/shared/lib'
import { routes, routesPath } from '~src/shared/routes'

const HomePage = lazy(() => import('./home'), 'HomePage')
const MapPage = lazy(() => import('./map'), 'MapPage')
const ErrorPage = lazy(() => import('./error'), 'ErrorPage')

export const routesMap = {
	home: {
		path: routesPath.home,
		element: HomePage,
		template: null,
		redirect: routes.home
	},
	map: {
		path: routesPath.map,
		element: MapPage,
		template: null
	},
	error: {
		path: routesPath.error,
		element: ErrorPage,
		redirect: routes.error
	}
}
