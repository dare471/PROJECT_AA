import { generateRoute } from '../lib'

export const HOME_ROUTE = 'home'
export const MAP_ROUTE = 'map'
export const SIGN_IN_ROUTE = 'login'
export const ERROR_ROUTE = 'error'
export const PROFILE_ROUTE = 'profile'

const home = generateRoute({
	path: HOME_ROUTE
})

const map = generateRoute({
	path: MAP_ROUTE,
	defaultQueryParams: {
		illustrate: 'country',
		mode: 'off'
	}
})

const signIn = generateRoute({
	path: SIGN_IN_ROUTE
})

const profile = generateRoute({
	path: PROFILE_ROUTE
})

const error = generateRoute({
	path: ERROR_ROUTE,
	defaultParams: {
		errorStatus: 404
	}
})

export const routes = {
	home,
	map,
	signIn,
	profile,
	error
} as const
