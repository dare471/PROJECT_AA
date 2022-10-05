export const HOME_ROUTE = '/'
export const MAP_ROUTE = '/map'
export const LOGIN_ROUTE = '/login'
export const PAGE404_ROUTE = '/404'

export const ROUTE_TO_HOME = (params: string[] = [], queryParams: string[] = []) =>
	`${HOME_ROUTE}${params.length > 0 ? `/${params.join('/')}` : ''}${
		queryParams.length > 0 ? `?${queryParams.join('&')}` : ''
	}`
export const ROUTE_TO_MAP = (params: string[] = [], queryParams: string[] = ['illustrate=country', 'mode=false']) =>
	`${MAP_ROUTE}${params.length > 0 ? `/${params.join('/')}` : ''}${
		queryParams.length > 0 ? `?${queryParams.join('&')}` : ''
	}`

export const ROUTE_TO_LOGIN = (params: string[] = [], queryParams: string[] = []) =>
	`${LOGIN_ROUTE}${params.length > 0 ? `/${params.join('/')}` : ''}${
		queryParams.length > 0 ? `?${queryParams.join('&')}` : ''
	}`

export const ROUTE_TO_404 = (params: string[] = [], queryParams: string[] = []) =>
	`${PAGE404_ROUTE}${params.length > 0 ? `/${params.join('/')}` : ''}${
		queryParams.length > 0 ? `?${queryParams.join('&')}` : ''
	}`
