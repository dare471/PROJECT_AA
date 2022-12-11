import { getRoute } from '~src/shared/lib/route'

export const routesPath = {
	home: 'home',
	map: 'map',
	mapPlayGround: 'map-play-ground',
	error: 'error'
}

export const routes = {
	home: getRoute({ path: routesPath.home }),
	map: getRoute({ path: routesPath.map }),
	mapPlayGround: getRoute({ path: routesPath.mapPlayGround }),
	error: getRoute({ path: routesPath.error })
}
