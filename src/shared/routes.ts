import { getRoute } from '~src/shared/lib/route'

export const routesPath = {
	home: 'home',
	map: 'map',
	error: 'error'
}

export const routes = {
	home: getRoute({ path: routesPath.home }),
	map: getRoute({ path: routesPath.map }),
	error: getRoute({ path: routesPath.error })
}
