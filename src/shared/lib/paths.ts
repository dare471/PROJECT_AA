export const HOME_ROUTE = '/'
export const MAP_ROUTE = '/map'
export const PAGE404_ROUTE = '/404'

export const ROUTE_TO_HOME = (params: string[] = []) =>
	`${HOME_ROUTE}${params.join('/')}`
export const ROUTE_TO_MAP = (params: string[] = []) =>
	`${MAP_ROUTE}/${params.join('/')}`
